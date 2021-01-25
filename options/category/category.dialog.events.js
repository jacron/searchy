import {bindToElements} from "../../common/bind-events.js";
import {hideDialogs} from "../dialog/dialog.hide.js";
import {storeCategory} from "../../background/update.js";

function saveTheCategory(cb) {
    const dialog = document.getElementById('dialogCategory');
    const nameElement = dialog.querySelector('#categoryName');
    if (nameElement.value === '') {
        alert('Can\'t save empty name');
        return;
    }
    storeCategory(dialog.getAttribute('data-id'),
        nameElement.value).then(() => {
            hideDialogs();
            cb({msg: 'changed'});
    });
}

function onKeydown(e, cb) {
    if (e.key === 'Enter') {
        saveTheCategory(cb);
    }
    if (e.key === 'Escape') {
        hideDialogs();
    }
}

function initCategoryEvents(cb) {
    bindToElements('click', [
        ['cancelCategory', hideDialogs],
        ['saveCategory', () => saveTheCategory(cb)],
    ]);
    bindToElements('keydown', [
        ['categoryName', e => onKeydown(e, cb)]
    ]);
}

export {initCategoryEvents}
