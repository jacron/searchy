import {template} from "./TypeAheadList.template.js";

class TypeAheadList extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'}); // sets and returns 'this.shadowRoot'
        this.shadowRoot.appendChild(this.createWrapper());
        this.attachEvents();
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

    createTextElement(obj) {
        const text = document.createElement('span');
        text.textContent = obj;
        // title.textContent = obj;  // this.renderLabel(obj);
        text.className = 'text';
        return text;
    }

    createDeleteButton() {
        const deleteButton = document.createElement('div');
        deleteButton.textContent = 'x';
        deleteButton.className = 'btn-delete';
        return deleteButton;
    }

    createRow(obj) {
        const title = document.createElement('div');
        const idProp = this.getAttribute('idProp');
        title.className = 'title';
        title.tabIndex = -1;
        if (idProp) {
            title.setAttribute('id', obj[idProp]);
        }
        title.appendChild(this.createTextElement(obj));
        title.style.backgroundColor = this.colors.bgTitle;
        title.style.color = this.colors.colTitle;
        title.appendChild(this.createDeleteButton());
        return title;
    }

    fillList(result) {
        this.list.innerHTML = '';
        this.dispatchSearchSave();
        for (const item of result) {
            this.list.appendChild(this.createRow(item));
        }
        this.list.style.visibility = 'visible';
    }

    next() {
        if (this.isEmptyList()) {
            return;
        }
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
                    this.dispatchSetSearch(row.querySelector('.text').textContent);
                    break;
                }
                if (this.isSelected(row)) {
                    activeFound = true;
                }
            }
            if (!activeFound) {
                this.moveSelector(rows[0]);
                this.dispatchSetSearch(rows[0].querySelector('.text').textContent);
            }
        }
    }

    prev() {
        if (this.isEmptyList()) {
            return;
        }
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
                    this.dispatchSetSearch(row.querySelector('.text').textContent);
                    break;
                }
                if (this.isSelected(row)) {
                    activeFound = true;
                }
            }
            if (!activeFound) {
                const lastRow = rows[rows.length - 1];
                this.moveSelector(lastRow);
                this.dispatchSetSearch(lastRow.querySelector('.text').textContent);
            }
        }
    }

    getRows() {
        return this.list.querySelectorAll('.title');
    }

    isEmptyList() {
        return this.list.innerHTML === '';
    }

    deleteTerm(target) {
    }

    closeList() {
        this.list.innerHTML = '';
        this.list.style.visibility = 'hidden';
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

    dispatchDelete(text) {
        this.dispatchEvent(new CustomEvent('delete', {
            detail: text,
            bubbles: true
        }))
    }

    dispatchSearchFocus() {
        this.dispatchAction('focus');
    }

    dispatchRestoreSearch() {
        this.dispatchAction('restoresearch');
    }

    dispatchSearchSave() {
        this.dispatchAction('save');
    }

    dispatchRestoreList() {
        this.dispatchAction('restorelist');
    }

    moveSelector(element) {
        this.clearSelector();
        if (element.querySelector('.btn-delete')) {
            element.style.backgroundColor = this.colors.bgSelected;
            element.setAttribute('selected', 'on');
            element.querySelector('.btn-delete').style.visibility = 'visible';
        }
    }

    isSelected(element) {
        return element.getAttribute('selected');
    }

    clearSelector() {
        const titles = this.list.querySelectorAll('.title');
        for (let i = 0; i < titles.length; i++) {
            const title = titles[i];
            title.style.backgroundColor = this.colors.bgTitle;
            title.removeAttribute('selected');
            title.querySelector('.btn-delete').style.visibility = 'hidden';
        }
    }

    listMouseOver(e) {
        const target = e.path[0];
        if (target.querySelector('.text')) {
            this.dispatchSetSearch(target.querySelector('.text').textContent);
            this.moveSelector(target);
        }
    }

    listMouseLeave() {
        this.dispatchRestoreSearch();
    }

    listClickHandler(e) {
        const target = e.path[0];
        if (target.classList.contains('title')) {
            this.dispatchSearchSave();
            this.dispatchSearchFocus();
            this.closeList();
        }
        if (target.classList.contains('btn-delete')) {
            this.dispatchDelete(target.parentElement
                .querySelector('.text').textContent);
            // target.parentElement.parentElement.removeChild(target.parentElement);
            e.preventDefault();  // ??
            // this.dispatchRestoreList();
        }
    }

    listBlurHandler(e) {
        const target = e.path[0];
        if (target.classList.contains('title')) {
            target.style.backgroundColor = this.colors.bgTitle;
            target.querySelector('.btn-delete').style.visibility = 'hidden';
        }
    }

    attachEvents() {
        this.list.addEventListener('click',
            this.listClickHandler.bind(this))
        this.list.addEventListener('blur',
            this.listBlurHandler.bind(this))
        this.list.addEventListener('mouseover',
                this.listMouseOver.bind(this))
        this.list.addEventListener('mouseleave',
                this.listMouseLeave.bind( this))
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
