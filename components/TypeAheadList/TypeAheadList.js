import {template} from "./TypeAheadListTemplate.js";

class TypeAheadList extends HTMLElement {
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
            .replace('%bgTitle', this.fromAttribute('bgTitle', '#292a2d'))
            .replace('%colTitle', this.fromAttribute('colTitle', '#eee'))
            .replace('%bgSelected', this.fromAttribute('bgSelected', '#4b4c4f'))
    }

    createRow(obj) {
        const title = document.createElement('div');
        const idProp = this.getAttribute('idProp');
        title.className = 'title';
        title.tabIndex = -1;
        if (idProp) {
            title.setAttribute('id', obj[idProp]);
        }
        title.textContent = obj;  // this.renderLabel(obj);
        return title;
    }

    fillList(result) {
        this.list.innerHTML = '';
        // this.saveSearchValue();
        for (const item of result) {
            this.list.appendChild(this.createRow(item));
        }
    }

    listClickHandler(e, that) {
        that.dispatchSelect(e);
    }

    next() {
        const rows = this.getRows();
        let activeFound = false;
        if (this.shadowRoot.activeElement === rows[rows.length - 1]) {
            // this.search.focus();
            rows[0].focus();
            this.dispatchSetSearch(rows[0].textContent);
            // this.setSearch(rows[0].textContent);
        } else {
            for (let i = 0; i < rows.length; i++) {
                const row = rows[i];
                if (activeFound) {
                    row.focus();
                    this.dispatchSetSearch(row.textContent);
                    // this.setSearch(row.textContent);
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
            this.restoreSearchValue();
            this.search.focus();
        } else {
            for (let i = rows.length - 1; i > -1; i--) {
                const row = rows[i];
                if (activeFound) {
                    row.focus();
                    this.dispatchSetSearch(row.textContent);
                    // this.setSearch(row.textContent);
                    break;
                }
                if (this.shadowRoot.activeElement === row) {
                    activeFound = true;
                }
            }
        }
    }

    getRows() {
        return this.list.querySelectorAll('.title');
    }

    closeList() {
        this.list.innerHTML = '';
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
                that.closeList();
                this.restoreSearchValue();
                this.search.focus();
                break;
            case 'Enter':
                const title = e.path[0];
                console.log(title);
                // that.setSearch(title.textContent)
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
            },
            bubbles: true
        }))
        this.closeList();
        this.search.focus();
    }

    dispatchSetSearch(s) {
        this.dispatchEvent(new CustomEvent('search', {
            detail: {
                text: s
            },
            bubbles: true
        }))
    }

    dispatchRestoreSearch() {
        this.dispatchEvent(new CustomEvent('restore', {
            bubbles: true
        }))
    }

    startListFocus() {
        const title = this.list.querySelector('.title');
        if (title) {
            title.focus();
            // this.setSearch(title.textContent)
            this.dispatchSetSearch(title.textContent);
        }
    }

    listMouseOver(e) {
        const title = e.path[0];
        // this.setSearch(title.textContent);
        this.dispatchSetSearch(title.textContent);
        title.focus();
    }

    listMouseLeave() {
        // this.restoreSearchValue();
        this.dispatchRestoreSearch();
    }

    attachEvents() {
        this.list.addEventListener('keydown',
            e => this.listKeyHandler(e, this))
        this.list.addEventListener('click',
            e => this.listClickHandler(e, this))
        this.list.addEventListener('mouseover', e => this.listMouseOver(e, this))
        this.list.addEventListener('mouseleave', e => this.listMouseLeave(e, this))
    }

    createWrapper() {
        const wrapper = document.createElement('span');
        wrapper.className = 'wrapper';
        wrapper.innerHTML = this.setStyling(template);
        this.list = wrapper.querySelector('.slist');
        return wrapper;
    }
}


function initTypeAheadList() {
    customElements.define('type-ahead-list', TypeAheadList);
}

export {initTypeAheadList}
