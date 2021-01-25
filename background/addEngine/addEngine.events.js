import {bindToElements} from "../../common/bind-events.js";
import {getTitleParts} from "../../common/stringutils.js";
import {populateOptions} from "../../options/dialog/dialog.js";
import {storeCategory, storeEngine} from "../../common/update.js";

const formAdd = {
    inputName: document.getElementById('inputName'),
    inputUrl: document.getElementById('inputUrl'),
    selectCategory: document.getElementById('selectCategory'),
    cmdSave: document.getElementById('btnSave'),
}

let currentTab;

function save() {
    storeEngine('-1',
        formAdd.inputName.value,
        formAdd.inputUrl.value,
        formAdd.selectCategory.value)
        .then(() => {
            window.close();
        })
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
    console.log(answer);
    if (answer) {
        storeCategory('-1', answer).then(newId =>
            populateOptions(formAdd.selectCategory, newId))
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
