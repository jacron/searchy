import {displayItems, showEngineLinks} from "./options/options.create.js";
import {hideElement} from "../common/htmlelements.js";
import {bindToElements} from "../common/bind-events.js";
import {initBackground} from "./dialog/dialog.background.js";
import {insertTemplate} from "./dialog/dialog.insert.js";
import {showDialog} from "./dialog/dialog.js";
import {addImportedCategory, setCategories} from "../common/update.js";
import {getCategories} from "../common/fetch.js";
import {hideDialogs} from "./dialog/dialog.hide.js";
import {notifysearchy} from "../common/notifysearchy.js";

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

function dialogImport(categories) {
    displayItems(categories, () => {
        if (confirm("Do you want to keep these changes?")) {
            // persistData({categories});
            setCategories(categories);
            hideElement('dialogImport');
            notifysearchy();
        } else {
            getCategories().then(categories => {
                displayItems(categories);
                hideElement('dialogImport');
            })
        }
    });
}

function importCategories(categories) {
    dialogImport(categories);
}

function importCategory(category, name) {
    getCategories().then(categories => {
        addImportedCategory(category, name, categories)
        hideDialogs();
        showEngineLinks();
        notifysearchy();
    });
}

function importData() {
    const categories = JSON.parse(getImportedData());
    const filename = getImportedFileName(); // name without extension
    const parts = filename.split('.');
    if (parts.length > 1) {
        importCategory(categories, parts[1]);
    } else {
        importCategories(categories);
    }
}

function onReaderLoad(e) {
    setImportedData(e.detail.content);
    if (e.detail.content) {
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
