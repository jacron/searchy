import {Contextmenu} from "../components/Contextmenu.js";
import {getTerm, storeTerm} from "./search.term.js";
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

const menuColors = {
    bgOption: '#b0d5f4',
    // colOption: '#333',
};

const menuColorsDark = {
    bgOption: '#3065b4',
    // colOption: 'rgb(234,234,234)',
}

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
            setDefault(engineForContextmenu
                .getAttribute('data-id'));
            break;
        case 'newtab':
            storeTerm(term);
            newTab(engineForContextmenu
                .getAttribute('data-href'), getTerm());
            break;
        case 'newwindow':
            storeTerm(term);
            newWindow(engineForContextmenu
                .getAttribute('data-href'), getTerm());
            break;
        case 'incognito':
            storeTerm(term);
            incognitoWindow(engineForContextmenu
                .getAttribute('data-href'), getTerm());
            break;
    }
}

function initSingletonContextmenuEngines() {
    if (!contextmenuEngines) {
        contextmenuEngines = new Contextmenu({
            options: menuOptions,
        }, 'engineContextmenu');

        // handle selection of user in contextmenu
        contextmenuEngines.menu.addEventListener('select',
            e => handleMenuSelect(e.detail))

        // close contextmenu on click
        document.body.addEventListener('click',
            () => contextmenuEngines.close());
    }
}

function setDisabledList(target) {
    const disabled = [];
    if (target.classList.contains('default')) {
        disabled.push('setdefault');
    }
    return disabled;
}

function openContextmenuEngines(e) {
    engineForContextmenu = e.target;
    const colors = document.body.classList.contains('dark') ?
        menuColorsDark : menuColors;
    contextmenuEngines.open(e, colors, setDisabledList(e.target));
}

export {openContextmenuEngines, initSingletonContextmenuEngines}
