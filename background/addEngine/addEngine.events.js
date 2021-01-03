import {bindToElements} from "../../common/bind-events.js";
import {getTitleParts} from "../../common/stringutils.js";
import {populateOptions} from "../../options/dialog/dialog.js";

const formAdd = {
    inputName: document.getElementById('inputName'),
    inputUrl: document.getElementById('inputUrl'),
    selectCategory: document.getElementById('selectCategory'),
    cmdSave: document.getElementById('btnSave'),
}

let currentTab;

function save() {
    chrome.runtime.sendMessage({
        cmd: 'saveEngine',
        id: '-1',
        name: formAdd.inputName.value,
        url: formAdd.inputUrl.value,
        categoryId: formAdd.selectCategory.value
    }, () => {
        window.close();
    });
}

function cancel() {
    window.close();
}

function setName(s) {
    formAdd.inputName.value = s;
}

function trimTitle1() {
    setName(getTitleParts(currentTab.title)[0]);
}

function trimTitle2() {
    setName(getTitleParts(currentTab.title)[1]);
}

function trimTitle12() {
    setName(currentTab.title);
}

function newCategory() {
    const answer = prompt('New category');
    if (answer) {
        chrome.runtime.sendMessage({
            cmd: 'saveCategory',
            id: '-1',
            name: answer
        }, response => {
            populateOptions(formAdd.selectCategory, response.newId);
        })
    }
}

function onKey(e) {
    if (e.key === 'Enter') {
        save();
    }
    if (e.key === 'Escape') {
        window.close();
    }
}

function initEvents(_currentTab) {
    currentTab = _currentTab;
    bindToElements('click', [
        ['btnSave', save],
        ['btnCancel', cancel],
        ['btnNewCategory', newCategory],
        ['trim-title-1', trimTitle1],
        ['trim-title-2', trimTitle2],
        ['trim-title-1-2', trimTitle12],
    ]);
    bindToElements('keyup', [
        ['inputName', onKey],
        ['inputUrl', onKey],
        ['selectCategory', onKey],
    ])
}

export {initEvents}
