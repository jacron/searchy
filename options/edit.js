import {openDialogAddEngine, openDialogCategory, openDialogEngine} from "./dialog.js";
import {reDisplay, showEngineLinks} from "./options.create.js";

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

function addEngineToCategory(id) {
    openDialogAddEngine(id, result => {
        reDisplay(result);
    });
}

function onEditClick(e, target, type) {
    clearSelected();
    const controls = target.parentElement;
    const engine = controls.parentElement;
    const a = engine.querySelector('.name');
    const name = a.textContent;
    const id = engine.getAttribute('data-id');
    if (target.classList.contains('fa-delete')) {
        removeObject(type, name, id);
    }
    if (target.classList.contains('fa-edit')) {
        editObject(type, engine, id);
    }
    if (target.classList.contains('fa-plus')) {
        addEngineToCategory(id);
    }
}

export {onEditClick}
