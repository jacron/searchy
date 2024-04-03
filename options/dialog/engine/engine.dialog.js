import {insertTemplate} from "../dialog.insert.js";
import {initBackground} from "../dialog.background.js";
import {initEngineEvents, setCurrentEngineName} from "./engine.dialog.events.js";
import {templateEngineDialog} from "./engine.dialog.template.js";
import {populateOptions, showDialog} from "../dialog.js";
import {getDelim} from "../../../common/stringutils.js";
import {getEngineWithCategoryById} from "../../../common/fetch.js";

function initTitleTrim(title) {
    const delim = getDelim(title);
    const trimButtons = ['trim-title-1', 'trim-title-2', 'trim-title-1-2'];
    for (const tr of trimButtons) {
        document.getElementById(tr)
            .style.visibility = delim ? 'visible' : 'hidden';
    }
}

function populateFieldsEngine(engineId, engineName, engineUrl) {
    setCurrentEngineName(engineName);
    initTitleTrim(engineName);
    document.getElementById('dialogEngine')
        .setAttribute('data-id', engineId);
    document.getElementById('engineName').value = engineName;
    document.getElementById('engineUrl').value = engineUrl;
}

function populateEngine(engine, category) {
    populateFieldsEngine(engine.id, engine.name, engine.url);
    const categoriesElement = document.getElementById('engineCategory');
    populateOptions(categoriesElement, category.id);
}

function openDialogEngine(id, cb) {
    const dialogAction = initDialogEngine(templateEngineDialog, 'Edit Engine', cb);
    getEngineWithCategoryById(id).then(([engine, category]) => {
        populateEngine(engine, category);
        showDialog(dialogAction);
        initialFocus();
    })
}

function openDialogAddEngine(catId, cb) {
    const dialogAction = initDialogEngine(templateEngineDialog, "New Engine", cb);
    const categoriesElement = document.getElementById('engineCategory');
    populateFieldsEngine(-1, '', '');
    populateOptions(categoriesElement, catId);
    showDialog(dialogAction);
    initialFocus();
}

function initialFocus() {
    document.getElementById('engineName').focus();
}

function initDialogEngine(template, header, cb) {
    const elementId = 'dialogEngine';
    let dialogAction = document.getElementById(elementId);
    if (!dialogAction) {
        insertTemplate(template);
        dialogAction = document.getElementById(elementId);
        initBackground();
        initEngineEvents(cb);
    }
    document.getElementById('dialogEngineHeader').textContent = header;
    return dialogAction;
}

export {initDialogEngine, openDialogAddEngine, openDialogEngine}
