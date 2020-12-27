import {bindToElements} from "../../common/bind-events.js";
import {hideDialogs} from "../dialog/dialog.hide.js";

function saveCategory(cb) {
    const dialog = document.getElementById('dialogCategory');
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

function onKeydown(e, cb) {
    if (e.key === 'Enter') {
        saveCategory(cb);
    }
    if (e.key === 'Escape') {
        hideDialogs();
    }
}

function initCategoryEvents(cb) {
    bindToElements('click', [
        ['cancelCategory', hideDialogs],
        ['saveCategory', () => saveCategory(cb)],
    ]);
    bindToElements('keydown', [
        ['categoryName', e => onKeydown(e, cb)]
    ]);
}

export {initCategoryEvents}
