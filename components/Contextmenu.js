/*
- recieve an array of choices (array of name, value, array of [disabled])
- create and display the menu
- return the selected choice (value) as a menu event (select)
 */

const menuStyle = {
    position: 'absolute',
    backgroundColor: 'inherit',
    padding: '5px',
    lineHeight: '1.8',
    border: '1px solid rgba(200, 200, 200, .3)',
    borderRadius: '6px',
    boxShadow: '0 6px 12px 3px rgba(0, 0, 0, 0.24)',
    outlineWidth: 0,
}

const optionStyle = {
    padding: '2px 10px 2px 16px',
    borderRadius: '4px',
    overflowX: 'hidden',
}

class Contextmenu {
    constructor(data, id) {
        this.menu = this.createMenu(data.options, id);
        this.rect = this.menu.getBoundingClientRect();
        this.attachEvents();
    }

    open(e, colors, disabled) {
        this.clearSelector();
        this.closeContextmenus();
        if (disabled) {
            this.disableOptions(disabled);
        }
        this.colors = colors;
        this.menu.style.visibility = 'visible';
        this.positionMenu(e);
        this.menu.focus();
    }

    close() {
        this.menu.style.visibility = 'hidden';
    }

    clearSelector() {
        const options = this.menu.querySelectorAll('.option');
        for (let i = 0; i < options.length; i++) {
            options[i].style.backgroundColor = 'inherit';
            options[i].removeAttribute('selected');
        }
    }

    closeContextmenus() {
        const menus = document.querySelectorAll('.contextmenu');
        for (let i = 0; i < menus.length; i++) {
            menus[i].style.visibility = 'hidden';
        }
    }

    moveSelector(option) {
        this.clearSelector();
        option.style.backgroundColor = this.colors.bgOption || '#3065b4';
        option.setAttribute('selected', 'true');
    }

    menuMouseOver(e, that) {
        const option = e.path[0];
        if (option.classList.contains('option')) {
            that.moveSelector(option);
        }
    }

    menuMouseLeave(e, that) {
        that.clearSelector();
    }

    menuClick(e, that) {
        const option = e.path[0];
        if (option.classList.contains('option')) {
            if (!option.getAttribute('disabled')) {
                that.menu.dispatchEvent(new CustomEvent('select', {
                    detail: option.id
                }));
            }
        }
    }

    menuKey(e, that) {
        if (e.key === 'Escape') {
            if (that.isOpen) {
                that.close();
            }
        }
        if (e.key === 'ArrowDown') {
            if (that.isOpen) {
                e.preventDefault();
                e.cancelBubble = true;
                e.stopPropagation();
                that.next();
            }
        }
        if (e.key === 'ArrowUp') {
            if (that.isOpen) {
                that.prev();
                e.preventDefault();
                e.cancelBubble = true;
                e.stopPropagation();
            }
        }
        if (e.key === 'Enter') {
            that.menu.dispatchEvent(new CustomEvent('select', {
                detail: that.selectedOptionChoice()
            }));
        }
    }

    attachEvents() {
        [
            ['mouseover', this.menuMouseOver],
            ['mouseleave', this.menuMouseLeave],
            ['click', this.menuClick],
            ['keydown', this.menuKey]
        ].forEach(binding => {
            const [event, listener] = binding;
            this.menu.addEventListener(event, e => listener(e, this))
        });
    }

    positionMenu(e) {
        if (e.pageX + this.rect.width > window.innerWidth) {
            this.menu.style.left = e.pageX - this.rect.width + 'px';
        } else {
            this.menu.style.left = e.pageX + 'px';
        }
        if (e.pageY + this.rect.height > window.innerHeight) {
            this.menu.style.top = e.pageY - this.rect.height + 'px';
        } else {
            this.menu.style.top = e.pageY + 'px';
        }
    }

    clearDisabled(options) {
        for (let i = 0; i < options.length; i++) {
            const optionElement = options[i];
            optionElement.removeAttribute('disabled');
            optionElement.style.opacity = '1';
        }
    }

    disableOptions(disabled) {
        const options = this.menu.querySelectorAll('.option');
        this.clearDisabled(options);
        disabled.forEach(d => {
            const optionElement = this.menu.querySelector('#' + d);
            if (optionElement) {
                optionElement.setAttribute('disabled', 'true');
                optionElement.style.opacity = '.6';
            }
        })
    }

    styleElement(element, dict) {
        Object.keys(dict).forEach(key => {
            element.style[key] = dict[key];
        })
    }

    toFirst(options) {
        for (let i = 0; i < options.length; i++) {
            if (!options[i].getAttribute('disabled')) {
                this.moveSelector(options[i]);
                break;
            }
        }
    }

    toLast(options) {
        for (let i = options.length - 1; i > -1; i--) {
            if (!options[i].getAttribute('disabled')) {
                this.moveSelector(options[i]);
                break;
            }
        }
    }

    isOpen() {
        return this.menu.style.visibility === 'visible';
    }

    selectedOptionChoice() {
        const selectedOption = this.menu.querySelector('[selected="true"]');
        if (selectedOption) {
            return selectedOption.getAttribute('id');
        } else {
            return null;
        }
    }

    next() {
        const options = this.menu.querySelectorAll('.option');
        if (options[options.length - 1].getAttribute('selected')) {
            this.toFirst(options);
        } else {
            let selectedFound = false;
            for (let i = 0; i < options.length; i++) {
                const option = options[i];
                if (selectedFound) {
                    this.moveSelector(option);
                    break;
                }
                if (option.getAttribute('selected')) {
                    selectedFound = true;
                }
            }
            if (!selectedFound) {
                this.toFirst(options);
            }
        }
    }

    prev() {
        const options = this.menu.querySelectorAll('.option');
        if (options[0].getAttribute('selected')) {
            this.toLast(options);
        } else {
            let activeFound = false;
            for (let i = options.length - 1; i > -1; i--) {
                const option = options[i];
                if (activeFound) {
                    this.moveSelector(option);
                    break;
                }
                if (option.getAttribute('selected')) {
                    activeFound = true;
                }
            }
            if (!activeFound) {
                this.toLast(options);
            }
        }

    }

    createOption(option) {
        const optionElement = document.createElement('div');
        optionElement.setAttribute('id', option[1]);
        optionElement.className = 'option';
        optionElement.textContent = option[0];
        this.styleElement(optionElement, optionStyle);
        return optionElement;
    }

    createHr() {
        const hr = document.createElement('hr');
        hr.style.opacity = '.4';
        return hr;
    }

    createMenu(options, id) {
        const menu = document.createElement('div');
        menu.setAttribute('id', id);
        menu.setAttribute('tabIndex', '-1');
        menu.className = 'contextmenu';
        options.forEach(option => {
            if (option[0] === '-') {
                menu.appendChild(this.createHr());
            } else {
                menu.appendChild(this.createOption(option));
            }
        })
        this.styleElement(menu, menuStyle);
        document.body.appendChild(menu);
        return menu;
    }
}

export {Contextmenu}

