import config from "../common/config.js";
import {getDataFromStorage} from "../common/persist.js";
import {downloadJson} from "../common/download.js";
import {openDialogImport} from "./dialog.js";

let importedData;

function getImportedData() {
    return importedData;
}

function setImportedData(data) {
    importedData = data;
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

function exportJson() {
    const filename = config.transportFileNameJson;
    getDataFromStorage(data => {
        downloadJson(data, filename);
    })
}

function onReaderLoad(e) {
    setImportedData(e.detail.content);
    if (e.detail.content) {
        document.getElementById('btnImportData')
            .style.display = 'block';
    }
}

function initImport() {
    const filesInput = document.querySelector('files-input');
    filesInput.header = 'Import';
    filesInput.addEventListener('load', onReaderLoad);
}

export {getImportedData, setImportedData, initImport,
    exportJson, restoreData}
