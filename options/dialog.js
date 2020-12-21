import {templateEngine, templateCategory} from './dialog.templates.js';

function hideDialogs() {
    hideElement('dialogEngine');
    hideElement('dialogCategory');
    hideElement('dialogBackground');
}

function initBackground() {
    document.getElementById('dialogBackground')
        .removeEventListener('click', hideDialogs);
    document.getElementById('dialogBackground')
        .addEventListener('click', hideDialogs);
}

function saveEngine(target, cb) {
    const dialog = target.parentElement;
    const nameElement = dialog.querySelector('#engineName');
    const urlElement = dialog.querySelector('#engineUrl');
    const categoryElement = dialog.querySelector('#engineCategory');
    chrome.runtime.sendMessage({
        cmd: 'saveEngine',
        id: dialog.getAttribute('data-id'),
        name: nameElement.value,
        url: urlElement.value,
        categoryId: categoryElement.value
    }, () => {
        hideDialogs();
        cb({msg: 'changed'});
    })
}

function saveCategory(target, cb) {
    const dialog = target.parentElement;
    const nameElement = dialog.querySelector('#categoryName');
    chrome.runtime.sendMessage({
        cmd: 'saveCategory',
        id: dialog.getAttribute('data-id'),
        name: nameElement.value,
    }, () => {
        hideDialogs();
        cb({msg: 'changed'});
    })
}

function initEngineEvents(cb) {
    document.getElementById('formEngine')
        .addEventListener('submit', e => {
            saveEngine(e.target, cb);
            e.preventDefault()
        });
    document.getElementById('cancelEngine')
        .addEventListener('click', hideDialogs)
}

function initDialogEngine(template, cb) {
    const elementId = 'dialogEngine';
    let dialogAction = document.getElementById(elementId);
    if (!dialogAction) {
        document.body.insertAdjacentHTML('beforeend', template);
        dialogAction = document.getElementById(elementId);
        initBackground();
        initEngineEvents(cb);
    }
    return dialogAction;
}

function initCategoryEvents(cb) {
    document.getElementById('formCategory')
        .addEventListener('submit', e => {
            saveCategory(e.target, cb);
            e.preventDefault()
        });
    document.getElementById('cancelCategory')
        .addEventListener('click', hideDialogs)
}

function initDialogCategory(template, cb) {
    const elementId = 'dialogCategory';
    let dialogAction = document.getElementById(elementId);
    if (!dialogAction) {
        document.body.insertAdjacentHTML('beforeend', template);
        dialogAction = document.getElementById(elementId);
        initCategoryEvents(cb);
    }
    return dialogAction;
}

function showBackground() {
    document.getElementById('dialogBackground').style.display = 'block';
}

function showDialog(x, y, dialog) {
    showBackground();
    dialog.style.top = y + 'px';
    dialog.style.left = x + 'px';
    dialog.style.display = 'block';
}

function populateOptions(selectElement) {
    chrome.runtime.sendMessage({cmd: 'getCategories'}, response => {
        response.categories.map(category => {
            const option = document.createElement('option');
            option.value = category.id;
            option.label = category.name;
            selectElement.appendChild(option);
        })
    })
}

function openDialogAddEngine(x, y, cb) {
    const dialogAction = initDialogEngine(templateEngine, cb);
    document.getElementById('dialogEngine')
        .setAttribute('data-id', '-1');
    const categoriesElement = document.getElementById('engineCategory');
    populateOptions(categoriesElement);
    categoriesElement.value = '-1';
    showDialog(x, y, dialogAction);
}

function openDialogAddCategory(x, y, cb) {
    const dialogAction = initDialogCategory(templateCategory, cb);
    document.getElementById('dialogCategory')
        .setAttribute('data-id', '-1');
    showDialog(x, y, dialogAction);
}

function populateEngine(engine, category) {
    document.getElementById('dialogEngine')
        .setAttribute('data-id', engine.id);
    document.getElementById('engineName').value = engine.name;
    document.getElementById('engineUrl').value = engine.url;
    const categoriesElement = document.getElementById('engineCategory');
    populateOptions(categoriesElement);
    categoriesElement.value = category.id;
}

function openDialogEngine(x, y, id, cb) {
    const dialogAction = initDialogEngine(templateEngine, cb);
    chrome.runtime.sendMessage({
        cmd: 'getEngineById', id
    }, response => {
        if (response) {
            const {engine, category} = response;
            populateEngine(engine, category);
        }
    })
    showDialog(x, y, dialogAction);
}

function openDialogCategory(x, y, id, cb) {
    const dialogAction = initDialogCategory(templateCategory, cb);
    chrome.runtime.sendMessage({
        cmd: 'getCategoryById', id
    }, response => {
        if (response) {
            const {category} = response;
            document.getElementById('dialogCategory')
                .setAttribute('data-id', category.id);
            document.getElementById('categoryName').value = category.name;
        }
    })
    showDialog(x, y, dialogAction);
}

function hideElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.style.display = 'none';
    }
}

export {openDialogEngine, openDialogCategory,
    openDialogAddEngine, openDialogAddCategory}
