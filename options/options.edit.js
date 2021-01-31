import {reDisplayEngines, showEngineLinks} from "./options/options.create.js";
import {setDefaultEngineId} from "../storage/default.js";
import {getCategoryById} from "../common/fetch.js";
import {downloadJson} from "../common/download.js";
import {openDialogAddEngine, openDialogEngine} from "./engine/engine.dialog.js";
import {openDialogCategory} from "./category/category.dialog.js";
import {askRemoveCategory} from "./category/category.remove.js";
import {removeEngine} from "../common/update.js";
import {notifysearchy} from "../common/notifysearchy.js";

function clearClass(className) {
    const selectedElements = document.getElementsByClassName(className);
    for (let i = 0; i < selectedElements.length; i++) {
        selectedElements[i].classList.remove(className);
    }
}

function clearSelected() {
    clearClass('selected');
}

function remove(type, id) {
    if (type === 'engine') {
        removeEngine(id).then(() => {
            showEngineLinks();
            notifysearchy();
        });
    }
    if (type === 'category') {
        askRemoveCategory(id).then(success => {
            if (success) {
                showEngineLinks();
                notifysearchy();
            }
        });
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
        openDialogEngine(id);
    }
    if (type === 'category') {
        openDialogCategory(id);
    }
}

function addEngineToCategory(categoryId) {
    openDialogAddEngine(categoryId, result => {
        reDisplayEngines(result);
        notifysearchy();
    });
}

function setEngineDefault(engineId) {
    setDefaultEngineId(engineId);
    showEngineLinks();
    notifysearchy();
}

function exportGroup(categoryId) {
    getCategoryById(categoryId).then(category =>
        downloadJson(category, `searchy.${category.name}.json`)
    )
}

function newTab(url) {
    chrome.tabs.create({url});
}

function editEngine(cmd, engine) {
    const objectId = engine.getAttribute('data-id');
    switch(cmd) {
        case 'edit':
            editObject('engine', engine, objectId);
            break;
        case 'link':
            const url = engine.getAttribute('data-url');
            newTab(url);
            break;
        case 'delete':
            const name = engine.querySelector('.name').textContent;
            removeObject('engine', name, objectId);
            break;
        case 'set-default':
            setEngineDefault(objectId);
            break;
    }
}

function editCategory(cmd, category) {
    const objectId = category.getAttribute('data-id');
    switch(cmd) {
        case 'edit':
            editObject('category', category, objectId);
            break;
        case 'delete':
            const name = category.querySelector('.name').textContent;
            removeObject('category', name, objectId);
            break;
        case 'add':
            addEngineToCategory(objectId);
            break;
        case 'export-group':
            exportGroup(objectId);
            break;
    }
}

export {clearSelected, clearClass, editEngine, editCategory}
