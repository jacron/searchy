import {openDialogAddEngine, openDialogCategory, openDialogEngine} from "./dialog.js";
import {reDisplay, showEngineLinks} from "./options.create.js";
import {setDefaultEngineId} from "../storage/default.js";

function clearSelected() {
    const selectedElements = document.getElementsByClassName('selected');
    for (let i = 0; i < selectedElements.length; i++) {
        selectedElements[i].classList.remove('selected');
    }
}

function onCategoryRemoved(response, id) {
    if (response.msg) {
        if (response.msg === 'ok') {
            showEngineLinks();
        } else if (response.msg === 'category not empty') {
            if (confirm("This category contains engines. Delete them also?")) {
                chrome.runtime.sendMessage({
                    cmd: 'removeCategory',
                    forced: true,
                    id
                }, () => {
                    showEngineLinks();
                })
            }
        }
    }
}

function removeCategory(id) {
    chrome.runtime.sendMessage({
        cmd: 'removeCategory',
        force: false,
        id
    }, response => {
        onCategoryRemoved(response, id);
    })
}

function removeEngine(id) {
    chrome.runtime.sendMessage({
        cmd: 'removeEngine',
        id
    }, () => {
        showEngineLinks();
    })
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

function onEditClick(e, target, type) {
    clearSelected();
    const controls = target.parentElement;
    const object = controls.parentElement;
    const a = object.querySelector('.name');
    const name = a.textContent;
    const objectId = object.getAttribute('data-id');
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
}

export {onEditClick}
