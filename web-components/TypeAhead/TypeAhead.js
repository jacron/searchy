import {template} from './TypeAhead.template.js';
import {initTypeAheadList} from "../TypeAheadList/TypeAheadList.js";

class TypeAhead extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'}); // sets and returns 'this.shadowRoot'
        initTypeAheadList();
        this.shadowRoot.appendChild(this.createWrapper());
        this.attachEvents();
        this.setFlyOnEnter();
        this.setWidth();
    }

    setWidth() {
        const width = this.getAttribute('width');
        if (width) {
            this.typeAheadList.list.style.width = width + 'px';
        }
    }

    closeList() {
        this.typeAheadList.closeList();
        this.restoreSearchValue();
    }

    fromAttribute(attr, deflt) {
        return this.getAttribute(attr) || deflt;
    }

    setColors(colors) {
        // this.colors = colors;
        this.search.style.backgroundColor = colors.bgInput;
        this.search.style.color = colors.colInput;
        this.typeAheadList.setColors({
            bgTitle: colors.bgTitle,
            colTitle: colors.colTitle,
            bgSelected: colors.bgSelected,
        });
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
        this.getItems(this.search.value, items => {
            this.typeAheadList.fillList(items);
        })
    }

    handleEnterKey() {
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
            },
            bubbles: true
        }))
    }

    saveSearchValue() {
        this.savedSearch = this.search.value;
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
                this.saveSearchValue();
                break;
        }
    }

    setSearch(e) {
        this.search.value = e.detail.text;
    }

    doDelete(e) {
        this.getItems(this.search.value, items => {
            this.setItems(items.filter(item => item !== e.detail))
            this.restoreSearchValue();
            this.fillList();
        })
    }

    attachEvents() {
        this.search.addEventListener('keyup',
            this.searchKeyHandler.bind(this))
        this.typeAheadList.addEventListener('setsearch',
            this.setSearch.bind(this))
        this.typeAheadList.addEventListener('delete',
            this.doDelete.bind(this))
        this.typeAheadList.addEventListener('action',
            this.doAction.bind(this))
    }

    createWrapper() {
        const wrapper = document.createElement('div');
        wrapper.className = 'wrapper';
        wrapper.innerHTML = template;
        this.search = wrapper.querySelector('#search');
        this.list = wrapper.querySelector('.slist');
        this.typeAheadList = wrapper.querySelector('type-ahead-list');
        return wrapper;
    }
}

function initTypeAhead() {
    customElements.define('type-ahead', TypeAhead);
}

export {initTypeAhead}
