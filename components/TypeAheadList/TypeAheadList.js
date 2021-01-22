import {template} from "./TypeAheadListTemplate.js";

class TypeAheadList extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'}); // sets and returns 'this.shadowRoot'
        this.shadowRoot.appendChild(this.createWrapper());
        this.attachEvents();
    }

    setColors(colors) {
        this.colors = colors;
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
        title.style.backgroundColor = this.colors.bgTitle;
        title.style.color = this.colors.colTitle;
        title.addEventListener('blur', () => {
            title.style.backgroundColor = this.colors.bgTitle;
        })
        return title;
    }

    fillList(result) {
        this.list.innerHTML = '';
        this.dispatchSearchSave();
        for (const item of result) {
            this.list.appendChild(this.createRow(item));
        }
    }

    next() {
        const rows = this.getRows();
        if (this.isSelected(rows[rows.length -1])) {
            this.dispatchRestoreSearch();
            this.clearSelector();
        } else {
            let activeFound = false;
            for (let i = 0; i < rows.length; i++) {
                const row = rows[i];
                if (activeFound) {
                    this.moveSelector(row);
                    this.dispatchSetSearch(row.textContent);
                    break;
                }
                if (this.isSelected(row)) {
                    activeFound = true;
                }
            }
            if (!activeFound) {
                this.moveSelector(rows[0]);
                this.dispatchSetSearch(rows[0].textContent);
            }
        }
    }

    prev() {
        const rows = this.getRows();
        if (this.isSelected(rows[0])) {
            this.dispatchRestoreSearch();
            this.clearSelector();
        } else {
            let activeFound = false;
            for (let i = rows.length - 1; i > -1; i--) {
                const row = rows[i];
                if (activeFound) {
                    this.moveSelector(row);
                    this.dispatchSetSearch(row.textContent);
                    break;
                }
                if (this.isSelected(row)) {
                    activeFound = true;
                }
            }
            if (!activeFound) {
                const lastRow = rows[rows.length - 1];
                this.moveSelector(lastRow);
                this.dispatchSetSearch(lastRow.textContent);
            }
        }
    }

    getRows() {
        return this.list.querySelectorAll('.title');
    }

    isEmptyList() {
        return this.list.innerHTML === '';
    }

    closeList() {
        this.list.innerHTML = '';
    }

    dispatchSetSearch(s) {
        this.dispatchEvent(new CustomEvent('setsearch', {
            detail: {
                text: s
            },
            bubbles: true
        }))
    }

    dispatchAction(action) {
        this.dispatchEvent(new CustomEvent('action', {
            detail: {action},
            bubbles: true
        }))
    }

    dispatchSearchFocus() {
        this.dispatchAction('focus');
    }

    dispatchRestoreSearch() {
        this.dispatchAction('restore');
    }

    dispatchSearchSave() {
        this.dispatchAction('save');
    }

    moveSelector(element) {
        this.clearSelector();
        element.style.backgroundColor = this.colors.bgSelected;
        element.setAttribute('selected', 'on');
    }

    isSelected(element) {
        return element.getAttribute('selected');
    }

    clearSelector() {
        const titles = this.list.querySelectorAll('.title');
        for (let i = 0; i < titles.length; i++) {
            titles[i].style.backgroundColor = this.colors.bgTitle;
            titles[i].removeAttribute('selected');
        }
    }

    listMouseOver(e, that) {
        const title = e.path[0];
        that.dispatchSetSearch(title.textContent);
        this.moveSelector(title);
    }

    listMouseLeave() {
        this.dispatchRestoreSearch();
    }

    listClickHandler(e, that) {
        const title = e.path[0];
        that.dispatchSetSearch(title.textContent);
        that.dispatchSearchFocus();
        that.closeList();
    }

    attachEvents() {
        this.list.addEventListener('click',
            e => this.listClickHandler(e, this))
        this.list.addEventListener('mouseover',
                e => this.listMouseOver(e, this))
        this.list.addEventListener('mouseleave',
                e => this.listMouseLeave(e, this))
    }

    createWrapper() {
        const wrapper = document.createElement('span');
        wrapper.className = 'wrapper';
        wrapper.innerHTML = template;
        this.list = wrapper.querySelector('.slist');
        return wrapper;
    }
}


function initTypeAheadList() {
    customElements.define('type-ahead-list', TypeAheadList);
}

export {initTypeAheadList}
