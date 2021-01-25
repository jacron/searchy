import {getTitleParts} from "../../common/stringutils.js";
import {bindToElements} from "../../common/bind-events.js";
import {hideDialogs} from "../dialog/dialog.hide.js";
import {saveEngine, storeEngine} from "../../common/update.js";
import {showEngineLinks} from "../options/options.create.js";

let currentEngineName;

function setCurrentEngineName(name) {
    currentEngineName = name;
}

function addHttps(s) {
    if (s && s.indexOf('://') === -1) {
        return 'https://' + s;
    } else {
        return s;
    }
}

function setName(s) {
    document.getElementById('engineName').value = s;
}

function trimTitle1(e) {
    setName(getTitleParts(currentEngineName)[0]);
    e.preventDefault();
}

function trimTitle2(e) {
    setName(getTitleParts(currentEngineName)[1]);
    e.preventDefault();
}

function trimTitle12(e) {
    setName(currentEngineName);
    e.preventDefault();
}

function saveTheEngine() {
    const dialog = document.getElementById('dialogEngine');
    const nameElement = dialog.querySelector('#engineName');
    const urlElement = dialog.querySelector('#engineUrl');
    const categoryElement = dialog.querySelector('#engineCategory');
    if (nameElement.value === '') {
        alert('Can\'t save empty name');
        return;
    }
    storeEngine(dialog.getAttribute('data-id'),
        nameElement.value,
        addHttps(urlElement.value),
        categoryElement.value)
        .then(() => {
            hideDialogs();
            showEngineLinks();

    })
}

function onKeydown(e, cb) {
    if (e.key === 'Enter') {
        saveTheEngine(cb);
    }
    if (e.key === 'Escape') {
        hideDialogs();
    }
}

function initEngineEvents(cb) {
    bindToElements('click', [
        ['cancelEngine', hideDialogs],
        ['saveEngine', () => saveTheEngine(cb)],
        ['trim-title-1', trimTitle1],
        ['trim-title-2', trimTitle2],
        ['trim-title-1-2', trimTitle12],
    ]);
    bindToElements('keydown', [
        ['engineName', e => onKeydown(e, cb)],
        ['engineUrl', e => onKeydown(e, cb)],
        ['engineCategory', e => onKeydown(e, cb)],
    ]);
}

export {initEngineEvents, setCurrentEngineName}
