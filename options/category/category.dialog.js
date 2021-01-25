import {insertTemplate} from "../dialog/dialog.insert.js";
import {initCategoryEvents} from "./category.dialog.events.js";
import {showDialog} from "../dialog/dialog.js";
import {templateCategory} from "./category.template.js";
import {getCategoryById} from "../../background/fetch.js";

function openDialogAddCategory(cb) {
    const dialogAction = initDialogCategory(templateCategory, 'New Category', cb);
    document.getElementById('dialogCategory')
        .setAttribute('data-id', '-1');
    document.getElementById('categoryName').value = '';
    showDialog(dialogAction);
    initialFocus();
}

function populateCategory(category) {
    document.getElementById('dialogCategory')
        .setAttribute('data-id', category.id);
    document.getElementById('categoryName')
        .value = category.name;
}

function openDialogCategory(id, cb) {
    const dialogAction = initDialogCategory(templateCategory, 'Edit Category', cb);
    getCategoryById(id).then(category => populateCategory(category))

    // chrome.runtime.sendMessage({
    //     cmd: 'getCategoryById', id
    // }, response => {
    //     if (response) {
    //         const {category} = response;
    //         populateCategory(category);
    //     }
    // })
    showDialog(dialogAction);
    initialFocus();
}

function initialFocus() {
    document.getElementById('categoryName').focus();
}

function initDialogCategory(template, header, cb) {
    const elementId = 'dialogCategory';
    let dialogAction = document.getElementById(elementId);
    if (!dialogAction) {
        insertTemplate(template);
        dialogAction = document.getElementById(elementId);
        initCategoryEvents(cb);
    } else {
        initialFocus();
    }
    document.getElementById('dialogCategoryHeader').textContent = header;
    return dialogAction;
}

export {initDialogCategory, openDialogAddCategory, openDialogCategory}
