import {Contextmenu} from "../components/Contextmenu.js";
import {getTerm} from "./search.term.js";
import {setDefaultEngineId} from "../storage/default.js";
import {newTab, newWindow, incognitoWindow} from "./search.open.js";

// define singleton
let contextmenuEngines = null;

let engineForContextmenu;

const menuOptions = [
    ['Set Default', 'setdefault'],
    ['-', ''],
    ['Open Engine in new Tab', 'newtab'],
    ['Open Engine in New Window', 'newwindow'],
    ['Open Engine in New Incognito Window', 'incognito'],
];

function clearDefault() {
    const links = document.querySelectorAll('.engine a');
    for (let i = 0; i < links.length; i++) {
        links[i].className = '';
    }
}

function setDefault(id) {
    setDefaultEngineId(id);
    clearDefault();
    engineForContextmenu.className = 'default';
}

function handleMenuSelect(choice) {
    switch(choice) {
        case 'setdefault':
            setDefault(engineForContextmenu.getAttribute('data-id'));
            break;
        case 'newtab':
            newTab(engineForContextmenu.getAttribute('data-href'), getTerm());
            break;
        case 'newwindow':
            newWindow(engineForContextmenu.getAttribute('data-href'), getTerm());
            break;
        case 'incognito':
            incognitoWindow(engineForContextmenu.getAttribute('data-href'), getTerm());
            break;
    }
}

function bodyKeyup(e) {
    if (e.key === 'Escape') {
        if (contextmenuEngines.isOpen) {
            contextmenuEngines.close();
        }
    }
    if (e.key === 'ArrowDown') {
        if (contextmenuEngines.isOpen) {
            contextmenuEngines.next();
            e.preventDefault();
            e.cancelBubble = true;
            e.stopPropagation();
        }
    }
    if (e.key === 'ArrowUp') {
        if (contextmenuEngines.isOpen) {
            contextmenuEngines.prev();
            e.preventDefault();
            e.cancelBubble = true;
            e.stopPropagation();
        }
    }
    if (e.key === 'Enter') {
        handleMenuSelect(contextmenuEngines.selectedOptionChoice())
    }
}

function initContextmenuEngines() {
    if (!contextmenuEngines) {
        contextmenuEngines = new Contextmenu(
            menuOptions, 'engineContextmenu');
        contextmenuEngines.menu.addEventListener('select',
            e => handleMenuSelect(e.detail))
        document.body.addEventListener('click', () => contextmenuEngines.close());
        contextmenuEngines.menu.addEventListener('keyup', bodyKeyup, false);
    }
}

function enginesContextmenu(e) {
    const target = e.target;
    if (target.tagName === 'A') {
        initContextmenuEngines();
        engineForContextmenu = target;
        const disabled = [];
        if (target.classList.contains('default')) {
            disabled.push('setdefault');
        }
        contextmenuEngines.menu.style.outlineWidth = '0';
        contextmenuEngines.open(e, disabled);
        contextmenuEngines.menu.focus();
    }
    e.preventDefault();
}

export {enginesContextmenu}
