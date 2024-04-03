import {template} from "./TypeAheadList.template.js";
import {createRow} from "./TypeAheadList.create.js";

class TypeAheadList extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'}); // sets and returns 'this.shadowRoot'
        this.shadowRoot.appendChild(this.createWrapper());
        // this.attachEvents();
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
        this.dispatchSearchSave('-1');
        for (const item of result) {
            this.list.appendChild(createRow(item, this));
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

    dispatchAction(action, id) {
        this.dispatchEvent(new CustomEvent('action', {
            detail: {
                action,
                id
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

    dispatchSearchSave(id) {
        this.dispatchAction('save', id);
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

    isSelected(element) {
        return element.getAttribute('selected');
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

    // listMouseOver(e) {
    //     const target = e.path[0];
    //     if (target.querySelector('.text')) {
    //         this.dispatchSetSearch(target.querySelector('.text').textContent);
    //         this.moveSelector(target);
    //     }
    // }
    //
    // listMouseLeave() {
    //     this.dispatchRestoreSearch();
    // }
    //
    // listClickHandler(e) {
    //     const target = e.path[0];
    //     console.log(target);
    //     if (target.classList.contains('title')) {
    //         this.dispatchSearchSave(target.id);
    //         this.dispatchSearchFocus();
    //         this.closeList();
    //     }
    //     if (target.classList.contains('btn-delete')) {
    //         this.dispatchDelete(target.parentElement
    //             .querySelector('.text').textContent);
    //         e.preventDefault();  // ??
    //     }
    // }
    //
    // listBlurHandler(e) {
    //     const target = e.path[0];
    //     if (target.classList.contains('title')) {
    //         target.style.backgroundColor = this.colors.bgTitle;
    //         target.querySelector('.btn-delete').style.visibility = 'hidden';
    //     }
    // }

    // attachEvents() {
    //     this.list.addEventListener('click',
    //         this.listClickHandler.bind(this))
    //     this.list.addEventListener('blur',
    //         this.listBlurHandler.bind(this))
    //     this.list.addEventListener('mouseover',
    //             this.listMouseOver.bind(this))
    //     this.list.addEventListener('mouseleave',
    //             this.listMouseLeave.bind( this))
    // }

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
