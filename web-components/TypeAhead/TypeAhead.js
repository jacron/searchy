import {template} from './TypeAhead.template.js';
import {removeTerm, getTerms} from "../../search/search.term.js";

class TypeAhead extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'}); // sets and returns 'this.shadowRoot'
        this.shadowRoot.appendChild(this.createWrapper());
        this.attachEvents();
        this.setFlyOnEnter();
        this.attributesToList();
    }

    closeList() {
        this.typeAheadList.closeList();
    }

    fromAttribute(attr, deflt) {
        return this.getAttribute(attr) || deflt;
    }

    setColors(colors) {
        this.search.style.backgroundColor = colors.bgInput;
        this.search.style.color = colors.colInput;
        this.typeAheadList.setColors({
            bgTitle: colors.bgTitle,
            colTitle: colors.colTitle,
            bgSelected: colors.bgSelected,
        });
    }

    attributesToList() {
        const width = this.getAttribute('width');
        if (width && this.typeAheadList.list) {
            this.typeAheadList.list.style.width = width + 'px';
        }
        // console.log(this.getAttribute('deletable'));
        this.typeAheadList
            .deletable = this.getAttribute('deletable') || false;
    }

    setFlyOnEnter() {
        const attr = this.fromAttribute('flyOnEnter', 'true');
        this.flyOnEnter = attr === 'true' || attr === 'on' || attr === '1';
    }

    handleEscapeKey() {
        if (this.typeAheadList.isEmptyList()) {
            this.search.value = '';
        } else {
            this.typeAheadList.closeList();
            this.restoreSearchValue();
        }
    }

    handleNormalKey(e) {
        if (/^([A-Za-z0-9 ])$/.test(e.key)
            || e.key === 'Backspace'
            || e.key === 'Delete'
        ) {
            const q = this.search.value;
            const minLength = this.getAttribute('minLength') || 2;
            if (q.length >= minLength) {
                this.fillList();
            } else {
                this.typeAheadList.closeList();
            }
        }
    }

    fillList() {
        // getItems is defined in client code
        // items is an array of strings or objects
        this.getItems(this.search.value, items => {
            this.typeAheadList.fillList(items);
        })
    }

    handleEnterKey() {
        /* Dispatch enter if flyOnEnter, or if list (already) is closed. */
        if (this.flyOnEnter || this.typeAheadList.isEmptyList()) {
            this.typeAheadList.closeList();
            this.dispatchEnter();
        } else {
            this.typeAheadList.closeList();
        }
    }

    next() {
        this.typeAheadList.next();
    }

    prev() {
        this.typeAheadList.prev();
    }

    searchKeyHandler(e) {
        let listened = false;
        [
            ['Enter', this.handleEnterKey],
            ['ArrowDown', this.next],
            ['ArrowUp', this.prev],
            ['Escape', this.handleEscapeKey],
        ].forEach(binding => {
            let [key, listener] = binding;
            if (e.key === key) {
                listener = listener.bind(this);
                listener();
                listened = true;
            }
        })
        if (!listened) {
            this.handleNormalKey(e);
        }
    }

    dispatchEnter() {
        this.dispatchEvent(new CustomEvent('enter', {
            detail: {
                label: this.search.value,
                id: this.search.getAttribute('data-id')
            },
            bubbles: true
        }))
    }

    saveSearchValue(id) {
        this.savedSearch = this.search.value;
        this.search.setAttribute('data-id', id);
    }

    restoreSearchValue() {
        if (this.savedSearch) {
            this.search.value = this.savedSearch;
        }
    }

    doAction(e) {
        switch(e.detail.action) {
            case 'restoresearch':
                this.restoreSearchValue();
                break;
            case 'focus':
                this.search.focus();
                break;
            case 'save':
                this.saveSearchValue(e.detail.id);
                break;
        }
    }

    setSearch(e) {
        this.search.value = e.detail.text;
    }

    doDelete(e) {
        const element = e.detail;
        removeTerm(element.textContent);
        this.restoreSearchValue();
        getTerms().then(items => {
            this.typeAheadList.fillList(items);
            this.closeList();
        })
    }

    bindToElement(bindings, element) {
        bindings.forEach(binding => {
            const [type, handler] = binding;
            element.addEventListener(type, handler.bind(this));
        })
    }

    attachEvents() {
        /* handle some events from TypeAheadList */
        this.bindToElement(
        [
            ['setsearch', this.setSearch],
            ['delete', this.doDelete],
            ['action', this.doAction],
        ], this.typeAheadList);
        /* handle some events from input (search) */
        this.bindToElement([
            ['keyup', this.searchKeyHandler],
        ], this.search);
    }

    createWrapper() {
        const wrapper = document.createElement('div');
        wrapper.className = 'wrapper';
        wrapper.innerHTML = template;
        this.search = wrapper.querySelector('input');
        this.list = wrapper.querySelector('.slist');
        this.typeAheadList = wrapper.querySelector('type-ahead-list');
        return wrapper;
    }
}

function initTypeAhead() {
    customElements.define('type-ahead', TypeAhead);
}

export {initTypeAhead}
