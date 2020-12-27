import {getDataFromStorage, persistData} from "../common/persist.js";
import {displayItems} from "./options.create.js";
import {hideElement} from "../common/htmlelements.js";
import {hideDialogs} from "./dialog/dialog.hide.js";
import {bindToElements} from "../common/bind-events.js";
import {initBackground} from "./dialog/dialog.background.js";
import {insertTemplate} from "./dialog/dialog.insert.js";
import {showDialog} from "./dialog/dialog.js";

const templateImport = `
<div class="dialog" id="dialogImport">
    <files-input accept="application/json" header="Read data"></files-input>
    <button class="fa fa-floppy-o" id="btnImportData"> Import</button>
</div>
`;

let importedData;
let importedFileName;

function getImportedData() {
    return importedData;
}

function setImportedData(data) {
    importedData = data;
}

function getImportedFileName() {
    return importedFileName;
}

function setImportedFileName(name) {
    importedFileName = name;
}

function restoreData(cb) {
    getDataFromStorage(categories => {
        chrome.runtime.sendMessage({
            cmd: 'setCategories',
            categories
        }, () => {
            cb(categories);
        })
    })
}

function dialogImport(categories) {
    displayItems(categories, () => {
        if (confirm("Do you want to keep these changes?")) {
            persistData({categories});
            hideElement('dialogImport');
        } else {
            restoreData(categories => {
                displayItems(categories);
                hideElement('dialogImport');
            });
        }
    });
}

function setCategories(categories) {
    chrome.runtime.sendMessage({
        cmd: 'setCategories',
        categories
    }, () => {
        dialogImport(categories);
    });
}

function setCategory(category, name) {
    chrome.runtime.sendMessage({
        cmd: 'addCategory',
        category,
        name
    }, () => {
        hideDialogs();
    });
}

function importData() {
    const categories = JSON.parse(getImportedData());
    const filename = getImportedFileName(); // name without extension
    const parts = filename.split('.');
    if (parts.length > 1) {
        setCategory(categories, parts[1]);
    } else {
        setCategories(categories);
    }
}

function onReaderLoad(e) {
    setImportedData(e.detail.content);
    if (e.detail.content) {
        // console.log(e.detail.name);
        setImportedFileName(e.detail.name)
        document.getElementById('btnImportData')
            .style.display = 'block';
    }
}

function initDialogImport() {
    const elementId = 'dialogImport';
    let dialogAction = document.getElementById(elementId);
    if (!dialogAction) {
        insertTemplate(templateImport);
        dialogAction = document.getElementById(elementId);
        initBackground();
        initImport();
        bindToElements('click', [
            ['btnImportData', importData],
        ]);
    }
    return dialogAction;
}

function openDialogImport() {
    const dialogAction = initDialogImport();
    showDialog(dialogAction);
}

function initImport() {
    const filesInput = document.querySelector('files-input');
    filesInput.header = 'Import';
    filesInput.addEventListener('load', onReaderLoad);
}

export {initImport, importData, openDialogImport}
