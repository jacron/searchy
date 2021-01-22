import {template} from './TypeAhead.template.js';
import {initTypeAheadList} from "../TypeAheadList/TypeAheadList.js";

class TypeAhead extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'}); // sets and returns 'this.shadowRoot'
        initTypeAheadList();
        this.shadowRoot.appendChild(this.createWrapper());
        this.attachEvents();
        this.setStyling();
    }
    fromAttribute(attr, deflt) {
        return this.getAttribute(attr) || deflt;
    }
    setStyling() {
        this.search.style.backgroundColor = this.fromAttribute('bgInput', '#aaa');
        this.search.style.color = this.fromAttribute('colInput', '#333');
        this.typeAheadList.setColors({
            bgTitle: this.fromAttribute('bgTitle', '#292a2d'),
            colTitle: this.fromAttribute('colTitle', '#eee'),
            bgSelected: this.fromAttribute('bgSelected', '#4b4c4f')
        });
    }
    // searchSearchHandler(e, that) {
    //     // only handle clear here
    //     console.log('on search event...');
    //     console.log(e);
    //     // that.closeList();
    //     this.typeAheadList.closeList();
    //     // this.restoreSearchValue();
    // }
    // closeList() {
    //     this.typeAheadList.closeList();
    // }
    searchKeyHandler(e, that) {
        // console.log(e);
        if (e.key === 'Enter') {
            that.dispatchEnter(e);
            e.preventDefault();
        } else if (e.key === 'ArrowDown') {
            that.typeAheadList.next();
            e.preventDefault();
        } else if (e.key === 'ArrowUp') {
            that.typeAheadList.prev();
            e.preventDefault();
        }
        else if (e.key === 'Escape') {
            if (that.typeAheadList.closeList()) {
                that.search.value = '';
            }
            e.preventDefault();
        } else if (e.key !== 'Meta') {
            const q = that.search.value;
            if (q.length > 2) {
                // getItems is defined in client code
                that.getItems(q, items => {
                    that.typeAheadList.fillList(items);
                })
            } else {
                that.typeAheadList.closeList();
                // that.restoreSearchValue();
            }
        }
    }

    handleSelect(e) {
        // console.log('only focus here...');
        this.dispatchEvent(new CustomEvent('select', {
            detail: {
                id: e.detail.id,
                label: e.detail.label
            },
            bubbles: false
        }))
        this.search.focus();
        e.preventDefault();
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
        // console.log(e.detail);
        that.search.value = e.detail.text;
    }

    attachEvents() {
        this.search.addEventListener('keyup',
            e => this.searchKeyHandler(e, this))
        // this.search.addEventListener('search',
        //     e => this.searchSearchHandler(e, this))
        this.typeAheadList.addEventListener('setsearch',
            e => this.setSearch(e, this))
        this.typeAheadList.addEventListener('action',
            e => this.doAction(e.detail.action, this))
        this.typeAheadList.addEventListener('select',
            e => this.handleSelect(e))
    }
    createWrapper() {
        const wrapper = document.createElement('div');
        wrapper.className = 'wrapper';
        // wrapper.innerHTML = this.setStyling(template);
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
