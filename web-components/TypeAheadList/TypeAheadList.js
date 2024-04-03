import {template} from "./TypeAheadList.template.js";
import {createRow} from "./TypeAheadList.create.js";
import {nextRow, prevRow} from "./TypeAheadList.navigate.js";

class TypeAheadList extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'}); // sets and returns 'this.shadowRoot'
        this.shadowRoot.appendChild(this.createWrapper());
    }

    setColors(colors) {
        this.colors = colors;
        const titles = this.list.querySelectorAll('.title');
        if (titles.length) {
            for (let i = 0; i < titles.length; i++) {
                const title = titles[i];
                title.style.backgroundColor = colors.bgTitle;
                title.style.color = colors.colTitle;
            }
        }
        if (this.list.querySelector('.selected')) {
            this.list.querySelector('.selected')
                .style.backgroundColor = colors.bgSelected;
        }
        this.dispatchSearchFocus();
    }

    fillList(result) {
        this.list.innerHTML = '';
        for (const item of result) {
            this.list.appendChild(createRow(item, this));
        }
        this.list.style.visibility = 'visible';
    }

    getRows() {
        return this.list.querySelectorAll('.title');
    }

    isEmptyList() {
        return this.list.innerHTML === '';
    }

    closeList() {
        this.list.innerHTML = '';
        this.list.style.visibility = 'hidden';
    }

    next() {
        if (this.isEmptyList()) {
            return;
        }
        if (!nextRow(this.getRows(), this)) {
            this.dispatchRestoreSearch();
            this.clearSelector();
        }
    }

    prev() {
        if (this.isEmptyList()) {
            return;
        }
        if (!prevRow(this.getRows(), this)) {
            this.dispatchRestoreSearch();
            this.clearSelector();
        }
    }

    dispatchSetSearch(s) {
        this.dispatchEvent(new CustomEvent('setsearch', {
            detail: {
                text: s
            },
            bubbles: true
        }))
    }

    dispatchAction(action, name) {
        this.dispatchEvent(new CustomEvent('action', {
            detail: {
                action,
                name: name
            },
            bubbles: true
        }))
    }

    dispatchDelete(element) {
        this.dispatchEvent(new CustomEvent('delete', {
            detail: element,
            bubbles: true
        }))
    }

    dispatchSearchFocus() {
        this.dispatchAction('focus');
    }

    dispatchRestoreSearch() {
        this.dispatchAction('restoresearch');
    }

    dispatchSearchSave(name) {
        this.dispatchAction('save', name);
    }

    showDeleteButton(element) {
        if (element.querySelector('.btn-delete')) {
            element.querySelector('.btn-delete').style.visibility = 'visible';
        }
    }

    moveSelector(element) {
        this.clearSelector();
        element.style.backgroundColor = this.colors.bgSelected;
        element.setAttribute('selected', 'on');
        this.showDeleteButton(element);
    }

    clearDeleteButton(title) {
        const btnDelete = title.querySelector('.btn-delete');
        if (btnDelete) {
            btnDelete.style.visibility = 'hidden';
        }
    }

    clearSelector() {
        const titles = this.list.querySelectorAll('.title');
        for (let i = 0; i < titles.length; i++) {
            const title = titles[i];
            title.style.backgroundColor = this.colors.bgTitle;
            title.removeAttribute('selected');
            this.clearDeleteButton(title);
        }
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
