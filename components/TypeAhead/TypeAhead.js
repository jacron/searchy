import {template} from './TypeAhead.template.js';
import {initTypeAheadList} from "../TypeAheadList/TypeAheadList.js";

class TypeAhead extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'}); // sets and returns 'this.shadowRoot'
        initTypeAheadList();
        this.shadowRoot.appendChild(this.createWrapper());
        this.attachEvents();
    }
    fromAttribute(attr, deflt) {
        return this.getAttribute(attr) || deflt;
    }
    setStyling(template) {
        return template
            .replace('%bgInput', this.fromAttribute('bgInput', '#aaa'))
            .replace('%colInput', this.fromAttribute('colInput', '#333'))
    }
    createRow(obj) {
        const title = document.createElement('div');
        const idProp = this.getAttribute('idProp');
        title.className = 'title';
        title.tabIndex = -1;
        if (idProp) {
            title.setAttribute('id', obj[idProp]);
        }
        title.textContent = this.renderLabel(obj);
        return title;
    }
    fillList(list, result) {
        list.innerHTML = '';
        this.saveSearchValue();
        for (const item of result) {
            list.appendChild(this.createRow(item));
        }
    }
    searchSearchHandler(e, that) {
        // only handle clear here
        that.closeList();
        this.restoreSearchValue();
    }
    searchKeyHandler(e, that) {
        if (e.key === 'Enter') {
            that.dispatchEnter(e);
            e.preventDefault();
        } else if (e.key === 'ArrowDown') {
            that.typeAheadList.startListFocus();
            e.preventDefault();
        } else if (e.key === 'Escape') {
            that.list.innerHTML = '';
        } else {
            const q = that.search.value;
            if (q.length > 2) {
                // getItems is defined in client code
                that.getItems(q, items => {
                    // that.fillList(this.list, items)
                    // that.fillList(this.typeAheadList.list, items)
                    that.typeAheadList.fillList(items);
                })
            } else {
                that.closeList();
                this.restoreSearchValue();
            }
        }
    }
    dispatchSelect(e) {
        const target = e.path[0];
        this.dispatchEvent(new CustomEvent('select', {
            detail: {
                id: target.id,
                label: target.textContent,
            },
            bubbles: true
        }))
        this.closeList();
        this.search.focus();
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
    // setSearch(s) {
    //     this.search.value = s;
    // }
    attachEvents() {
        this.search.addEventListener('keyup',
            e => this.searchKeyHandler(e, this))
        this.search.addEventListener('search',
            e => this.searchSearchHandler(e, this))
        this.typeAheadList.addEventListener('search',
            e => this.search.value = e.detail.text)
        this.typeAheadList.addEventListener('restore',
            () => this.restoreSearchValue())
    }
    createWrapper() {
        const wrapper = document.createElement('div');
        wrapper.className = 'wrapper';
        wrapper.innerHTML = this.setStyling(template);
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