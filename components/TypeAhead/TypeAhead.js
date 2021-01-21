/*
TypeAhead

attributes with defaults:
    bgTitle='#333',
    bgInput='#aaa',
    colInput='#333',
    colTitle='#aaa',
    [idProp=''],
events:
    // events deliver e.details with properties
    // select item from list
    select:
        label,
        search,
        id
    // enter term in input box
    enter:
        label,
        search
methods:
    getItems(q, cb)
    renderLabel(obj)
 */
import {template} from './TypeAhead.template.js';

class TypeAhead extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'}); // sets and returns 'this.shadowRoot'
        this.shadowRoot.appendChild(this.createWrapper());
        this.attachEvents();
    }
    fromAttribute(attr, deflt) {
        return this.getAttribute(attr) || deflt;
    }
    setStyling(template) {
        return template
            .replace('%bgInput', this.fromAttribute('bgInput', '#aaa'))
            .replace('%bgTitle', this.fromAttribute('bgTitle', '#333'))
            .replace('%colInput', this.fromAttribute('colInput', '#333'))
            .replace('%colTitle', this.fromAttribute('colTitle', '#aaa'))
    }
    startListFocus() {
        const a = this.list.querySelector('.title');
        if (a) {
            a.focus();
        }
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
    fillList(result) {
        this.list.innerHTML = '';
        this.savedSearch = this.search.value;
        for (const item of result) {
            this.list.appendChild(this.createRow(item));
        }
    }
    searchSearchHandler(e, that) {
        // only handle clear here
        that.list.innerHTML = '';
    }
    searchKeyHandler(e, that) {
        if (e.key === 'Enter') {
            that.dispatchEnter(e);
            e.preventDefault();
        } else if (e.key === 'ArrowDown') {
            that.startListFocus();
            e.preventDefault();
        } else if (e.key === 'Escape') {
            that.list.innerHTML = '';
        } else {
            const q = that.search.value;
            // console.log({q});
            if (q.length > 2) {
                // getItems is defined in client code
                that.getItems(q, items => {
                    that.fillList(items)
                })
            } else {
                that.list.innerHTML = '';
            }
        }
    }
    getRows() {
        return this.list.querySelectorAll('.title');
    }
    next() {
        const rows = this.getRows();
        let activeFound = false;
        if (this.shadowRoot.activeElement === rows[rows.length - 1]) {
            this.search.focus();
        } else {
            for (let i = 0; i < rows.length; i++) {
                const row = rows[i];
                if (activeFound) {
                    row.focus();
                    break;
                }
                if (this.shadowRoot.activeElement === row) {
                    activeFound = true;
                }
            }
        }
    }
    prev() {
        const rows = this.getRows();
        let activeFound = false;
        if (this.shadowRoot.activeElement === rows[0]) {
            this.search.focus();
        } else {
            for (let i = rows.length - 1; i > -1; i--) {
                const row = rows[i];
                if (activeFound) {
                    row.focus();
                    break;
                }
                if (this.shadowRoot.activeElement === row) {
                    activeFound = true;
                }
            }
        }
    }
    closeList() {
        this.list.innerHTML = '';
    }
    clearList() {
        this.list.innerHTML = '';
        this.search.focus();
    }
    listKeyHandler(e, that) {
        switch(e.key) {
            case 'ArrowDown':
                e.preventDefault();
                that.next();
                break;
            case 'ArrowUp':
                that.prev();
                e.preventDefault();
                break;
            case 'Escape':
                that.clearList();
                break;
            case 'Enter':
                that.dispatchSelect(e);
                break;
        }
    }
    dispatchSelect(e) {
        const target = e.path[0];
        this.dispatchEvent(new CustomEvent('select', {
            detail: {
                id: target.id,
                label: target.textContent,
                search: this.search
            },
            bubbles: true
        }))
        this.clearList();
    }
    dispatchEnter(e) {
        // const target = e.path[0];
        this.dispatchEvent(new CustomEvent('enter', {
            detail: {
                label: this.search.value,
                search: this.search
            },
            bubbles: true
        }))
    }
    listClickHandler(e, that) {
        that.dispatchSelect(e);
    }
    listMouseOver(e, that) {
        // console.log(e.path[0]);
        const text = e.path[0].textContent;
        this.search.value = text;
    }
    listMouseLeave(e, that) {
        this.search.value = this.savedSearch;

    }
    attachEvents() {
        this.search.addEventListener('keyup',
            e => this.searchKeyHandler(e, this))
        this.search.addEventListener('search',
            e => this.searchSearchHandler(e, this))
        this.list.addEventListener('keydown',
            e => this.listKeyHandler(e, this))
        this.list.addEventListener('click',
            e => this.listClickHandler(e, this))
        this.list.addEventListener('mouseover', e => this.listMouseOver(e, this))
        this.list.addEventListener('mouseleave', e => this.listMouseLeave(e, this))
    }
    createWrapper() {
        const wrapper = document.createElement('div');
        wrapper.className = 'wrapper';
        wrapper.innerHTML = this.setStyling(template);
        // wrapper.querySelector('.search-label')
        //     .textContent = this.getAttribute('label');
        this.search = wrapper.querySelector('#search');
        this.list = wrapper.querySelector('.slist');
        return wrapper;
    }
}

function initTypeAhead() {
    customElements.define('type-ahead', TypeAhead);
}

export {initTypeAhead}
