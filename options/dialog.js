import {templateEngine, templateCategory, templateImport}
    from './dialog.templates.js';
import {importData, initImport} from "./import.js";
import {bindToElements} from "../common/bind-events.js";
import {getDelim, getTitleParts} from "../common/stringutils.js";
import {hideElement} from "../common/htmlelements.js";

let currentEngineName;

function hideDialogs() {
    for (let id of [
        'dialogEngine',
        'dialogCategory',
        'dialogImport',
        'dialogBackground'
    ]) {
        hideElement(id);
    }
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
    if (nameElement.value === '') {
        alert('Can\'t save empty name');
        return;
    }
    chrome.runtime.sendMessage({
        cmd: 'saveEngine',
        id: dialog.getAttribute('data-id'),
        name: nameElement.value,
        url: addHttps(urlElement.value),
        categoryId: categoryElement.value
    }, () => {
        hideDialogs();
        cb({msg: 'changed'});
    })
}

function addHttps(s) {
    if (s && s.indexOf('://') === -1) {
        return 'https://' + s;
    } else {
        return s;
    }
}

function saveCategory(target, cb) {
    const dialog = target.parentElement;
    const nameElement = dialog.querySelector('#categoryName');
    if (nameElement.value === '') {
        alert('Can\'t save empty name');
        return;
    }
    chrome.runtime.sendMessage({
        cmd: 'saveCategory',
        id: dialog.getAttribute('data-id'),
        name: nameElement.value,
    }, () => {
        hideDialogs();
        cb({msg: 'changed'});
    })
}

function setName(s) {
    document.getElementById('engineName').value = s;
}

function trimTitle1(e) {
    setName(getTitleParts(currentEngineName)[0]);
    e.preventDefault();
}

function trimTitle2(e) {
    setName(getTitleParts(currentEngineName)[1]);
    e.preventDefault();
}

function trimTitle12(e) {
    setName(currentEngineName);
    e.preventDefault();
}

function initEngineEvents(cb) {
    document.getElementById('formEngine')
        .addEventListener('submit', e => {
            if (e.submitter.getAttribute('id') !== 'cancelEngine') {
                saveEngine(e.target, cb);
            }
            e.preventDefault()
        });
    bindToElements('click', [
        ['cancelEngine', hideDialogs],
        ['trim-title-1', trimTitle1],
        ['trim-title-2', trimTitle2],
        ['trim-title-1-2', trimTitle12],
    ]);
}

function initTitleTrim(title) {
    const delim = getDelim(title);
    const trimButtons = ['trim-title-1', 'trim-title-2', 'trim-title-1-2'];
    for (const tr of trimButtons) {
        document.getElementById(tr)
            .style.visibility = delim ? 'visible' : 'hidden';
    }
}

function initDialogEngine(template, header, cb) {
    const elementId = 'dialogEngine';
    let dialogAction = document.getElementById(elementId);
    if (!dialogAction) {
        insertTemplate(template);
        dialogAction = document.getElementById(elementId);
        initBackground();
        initEngineEvents(cb);
    }
    document.getElementById('dialogEngineHeader').textContent = header;
    return dialogAction;
}

function insertTemplate(template) {
    document.body.insertAdjacentHTML('beforeend', template);
}

function initDialogImport(template) {
    const elementId = 'dialogImport';
    let dialogAction = document.getElementById(elementId);
    if (!dialogAction) {
        insertTemplate(template);
        dialogAction = document.getElementById(elementId);
        initBackground();
        initImport();
        bindToElements('click', [
            ['btnImportData', importData],
        ]);
    }
    return dialogAction;
}

function initCategoryEvents(cb) {
    document.getElementById('formCategory')
        .addEventListener('submit', e => {
            if (e.submitter.getAttribute('id') !== 'cancelCategory') {
                saveCategory(e.target, cb);
            }
            e.preventDefault()
        });
    document.getElementById('cancelCategory')
        .addEventListener('click', hideDialogs);
    document.getElementById('formCategory')
        .addEventListener('keydown', e => {
            if (e.key === 'Escape') {
                hideDialogs();
            }
        })
    bindToElements('click', [
        ['cancelCategory', hideDialogs],
    ]);
    bindToElements('keydown', [
        ['']
    ]);
}

function initDialogCategory(template, header, cb) {
    const elementId = 'dialogCategory';
    let dialogAction = document.getElementById(elementId);
    if (!dialogAction) {
        insertTemplate(template);
        dialogAction = document.getElementById(elementId);
        initCategoryEvents(cb);
    }
    document.getElementById('dialogCategoryHeader').textContent = header;
    return dialogAction;
}

function showBackground() {
    document.getElementById('dialogBackground').style.display = 'block';
}

function calcCenteredLeft(w) {
    return window.innerWidth / 2 - (w / 2);
}

function showDialog(dialog) {
    showBackground();
    dialog.style.display = 'block';
    const rect = dialog.getBoundingClientRect();
    dialog.style.top = '0px';
    dialog.style.left = calcCenteredLeft(rect.width) + 'px';
}

function populateOptions(selectElement, selectedCategoryId) {
    selectElement.innerHTML = '';
    chrome.runtime.sendMessage({cmd: 'getCategories'}, response => {
        response.categories.map(category => {
            const option = document.createElement('option');
            option.value = category.id;
            option.label = category.name;
            selectElement.appendChild(option);
        });
        selectElement.value = selectedCategoryId;
    })
}

function openDialogAddEngine(catId, cb) {
    const dialogAction = initDialogEngine(templateEngine, "New Engine", cb);
    const categoriesElement = document.getElementById('engineCategory');
    populateFieldsEngine(-1, '', '');
    populateOptions(categoriesElement, catId);
    showDialog(dialogAction);
}

function openDialogAddCategory(cb) {
    const dialogAction = initDialogCategory(templateCategory, 'New Category', cb);
    document.getElementById('dialogCategory')
        .setAttribute('data-id', '-1');
    document.getElementById('categoryName').value = '';
    showDialog(dialogAction);
}

function populateFieldsEngine(engineId, engineName, engineUrl) {
    currentEngineName = engineName;
    initTitleTrim(engineName);
    document.getElementById('dialogEngine')
        .setAttribute('data-id', engineId);
    document.getElementById('engineName').value = engineName;
    document.getElementById('engineUrl').value = engineUrl;
}

function populateEngine(engine, category) {
    populateFieldsEngine(engine.id, engine.name, engine.url);
    const categoriesElement = document.getElementById('engineCategory');
    populateOptions(categoriesElement, category.id);
}

function openDialogEngine(id, cb) {
    const dialogAction = initDialogEngine(templateEngine, 'Edit Engine', cb);
    chrome.runtime.sendMessage({
        cmd: 'getEngineById', id
    }, response => {
        if (response) {
            const {engine, category} = response;
            populateEngine(engine, category);
        }
    })
    showDialog(dialogAction);
}

function populateCategory(category) {
    document.getElementById('dialogCategory')
        .setAttribute('data-id', category.id);
    document.getElementById('categoryName')
        .value = category.name;
}

function openDialogCategory(id, cb) {
    const dialogAction = initDialogCategory(templateCategory, 'Edit Category', cb);
    chrome.runtime.sendMessage({
        cmd: 'getCategoryById', id
    }, response => {
        if (response) {
            const {category} = response;
            populateCategory(category);
        }
    })
    showDialog(dialogAction);
}

function openDialogImport() {
    const dialogAction = initDialogImport(templateImport);
    showDialog(dialogAction);
}

export {openDialogEngine, openDialogCategory, openDialogImport,
    openDialogAddEngine, openDialogAddCategory, hideDialogs}
