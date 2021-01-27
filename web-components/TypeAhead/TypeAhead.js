import {template} from './TypeAhead.template.js';
import {initTypeAheadList} from "../TypeAheadList/TypeAheadList.js";

class TypeAhead extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'}); // sets and returns 'this.shadowRoot'
        initTypeAheadList();
        this.shadowRoot.appendChild(this.createWrapper());
        this.attachEvents();
        // this.setStyling();
        this.setFlyOnEnter();
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

    handleDeleteKey() {
        this.dispatchDelete();
        this.typeAheadList.deleteTerm(this.search.value);
        this.restoreSearchValue();
    }

    handleNormalKey(e) {
        if (e.key !== 'Meta' && e.key !== 'Alt') {
            const q = this.search.value;
            const minLength = this.getAttribute('minLength') || 2;
            if (q.length >= minLength) {
                // getItems is defined in client code
                this.getItems(q, items => {
                    this.typeAheadList.fillList(items);
                })
            } else {
                this.typeAheadList.closeList();
            }
        }
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
            ['Delete', this.handleDeleteKey],
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

    dispatchDelete() {
        this.dispatchEvent(new CustomEvent('delete', {
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

    doAction(action, that) {
        switch(action) {
            case 'restore':
                that.restoreSearchValue();
                break;
            case 'focus':
                that.search.focus();
                break;
            case 'save':
                that.saveSearchValue();
                break;
        }
    }

    setSearch(e, that) {
        that.search.value = e.detail.text;
    }

    attachEvents() {
        this.search.addEventListener('keyup',
            this.searchKeyHandler.bind(this))
        this.typeAheadList.addEventListener('setsearch',
            e => this.setSearch(e, this))
        this.typeAheadList.addEventListener('action',
            e => this.doAction(e.detail.action, this))
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
