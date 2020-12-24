import {openDialogAddEngine, openDialogCategory, openDialogEngine} from "./dialog.js";
import {reDisplay, showEngineLinks} from "./options.create.js";
import {setDefaultEngineId} from "../storage/default.js";

function clearSelected() {
    const selectedElements = document.getElementsByClassName('selected');
    for (let i = 0; i < selectedElements.length; i++) {
        selectedElements[i].classList.remove('selected');
    }
}

function remove(type, id) {
    if (type === 'engine') {
        chrome.runtime.sendMessage({
            cmd: 'removeEngine',
            id
        }, () => {
            showEngineLinks();
        })
    }
    if (type === 'category') {
        chrome.runtime.sendMessage({
            cmd: 'removeCategory',
            id
        }, response => {
            if (response.msg && response.msg === 'ok') {
                showEngineLinks();
            } else {
                alert("Can't remove category that contains engines");
            }
        })
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
    if (target.classList.contains('fa-delete')) {
        removeObject(type, name, objectId);
    }
    if (target.classList.contains('fa-edit')) {
        editObject(type, object, objectId);
    }
    if (target.classList.contains('fa-plus')) {
        addEngineToCategory(objectId);
    }
    if (target.classList.contains('fa-flag')) {
        setEngineDefault(objectId);
    }
}

export {onEditClick}
