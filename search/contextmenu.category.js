import {Contextmenu} from "../components/Contextmenu.js";
import {ColorPicker} from "../components/ColorPicker.js";
import {removeCategoryProperty, setCategoryProperty} from "../common/update.js";
import {isDarkMode} from "../storage/dark.js";
import {openAllCategoryEngines} from "./search.events.js";

// define singleton
let contextmenuCategories = null;
let colorPicker = null;

let categoryForContextmenu;

const menuOptions = [
    ['Set Color', 'setcolor'],
    ['Remove Color', 'removecolor'],
    ['-'],
    ['Open All Engines', 'openall'],
];

const menuColors = {
    bgOption: '#b0d5f4',
    // colOption: '#333',
};

const menuColorsDark = {
    bgOption: '#3065b4',
    // colOption: 'rgb(234,234,234)',
}

function initSingletonColorPicker() {
    if (!colorPicker) {
        colorPicker = new ColorPicker();
        colorPicker.dialog.addEventListener('select', e => {
            const item = categoryForContextmenu.parentElement;
            item.style.backgroundColor = e.detail;
            const prop = isDarkMode() ? 'backgroundcolordark' : 'backgroundcolorlight';
            setCategoryProperty(item.getAttribute('data-id'), prop, e.detail);
        })
    }
}

function openColorDialog(e) {
    initSingletonColorPicker();
    const bg = categoryForContextmenu.parentElement.getAttribute('bg');
    colorPicker.openDialog(e, bg);
}

function removeColor() {
    const prop = isDarkMode() ? 'backgroundcolordark' : 'backgroundcolorlight';
    const item = categoryForContextmenu.parentElement;
    removeCategoryProperty(item.getAttribute('data-id'), prop);
}

function openAll() {
    openAllCategoryEngines(categoryForContextmenu);
}

function handleMenuSelect(e) {
    switch(e.detail) {
        case 'setcolor':
            openColorDialog(e);
            break;
        case 'removecolor':
            removeColor();
            break;
        case 'openall':
            openAll();
            break;
    }
}

function initSingletonContextmenuCategories() {
    if (!contextmenuCategories) {
        contextmenuCategories = new Contextmenu({
            options: menuOptions,
        }, 'engineContextmenu');

        // handle selection of user in contextmenu
        contextmenuCategories.menu.addEventListener('select',
            e => handleMenuSelect(e))

        // close contextmenu on click
        document.body.addEventListener('click',
            () => contextmenuCategories.close());
    }
}

function openContextmenuCategories(e) {
    categoryForContextmenu = e.target;
    const colors = document.body.classList.contains('dark') ?
        menuColorsDark : menuColors;
    contextmenuCategories.open(e, colors);
}

export {openContextmenuCategories, initSingletonContextmenuCategories}
