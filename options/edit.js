import {reDisplay, showEngineLinks} from "./options/options.create.js";
import {setDefaultEngineId} from "../storage/default.js";
import {getDataFromStorage} from "../common/persist.js";
import {getCategoryById} from "../background/fetch.js";
import {downloadJson} from "../common/download.js";
import {openDialogAddEngine, openDialogEngine} from "./engine/engine.dialog.js";
import {openDialogCategory} from "./category/category.dialog.js";
import {removeEngine} from "./engine/engine.remove.js";
import {removeCategory} from "./category/category.remove.js";

function clearSelected() {
    const selectedElements = document.getElementsByClassName('selected');
    for (let i = 0; i < selectedElements.length; i++) {
        selectedElements[i].classList.remove('selected');
    }
}

function remove(type, id) {
    if (type === 'engine') {
        removeEngine(id);
    }
    if (type === 'category') {
        removeCategory(id);
    }
}

function removeObject(type, name, id) {
    if (confirm(`Delete ${type} '${name}'?`)) {
        remove(type, id);
        clearSelected();
    }
}

function editObject(type, engine, id) {
    engine.classList.add('selected');
    if (type === 'engine') {
        openDialogEngine(id, result => {
            reDisplay(result);
            clearSelected();
        });
    }
    if (type === 'category') {
        openDialogCategory(id, result => {
            reDisplay(result);
            clearSelected();
        });
    }
}

function addEngineToCategory(categoryId) {
    openDialogAddEngine(categoryId, result => {
        reDisplay(result);
    });
}

function setEngineDefault(engineId) {
    setDefaultEngineId(engineId);
    showEngineLinks();
}

function exportGroup(categoryId) {
    getDataFromStorage(data => {
        getCategoryById(categoryId, {categories: data}, category => {
            downloadJson(category, `searchy.${category.name}.json`);
        })
    });
}

function newTab(url) {
    chrome.tabs.create({
        url
    });
}

function onEditClick(e, target, type) {
    clearSelected();
    const controls = target.parentElement;
    const object = controls.parentElement;
    const a = object.querySelector('.name');
    const name = a.textContent;
    const objectId = object.getAttribute('data-id');
    const url = object.getAttribute('data-url');
    if (target.classList.contains('delete')) {
        removeObject(type, name, objectId);
    }
    if (target.classList.contains('edit')) {
        editObject(type, object, objectId);
    }
    if (target.classList.contains('add')) {
        addEngineToCategory(objectId);
    }
    if (target.classList.contains('set-default')) {
        setEngineDefault(objectId);
    }
    if (target.classList.contains('export-group')) {
        exportGroup(objectId);
    }
    if (target.classList.contains('link')) {
        newTab(url);
    }
}

export {onEditClick, clearSelected}
