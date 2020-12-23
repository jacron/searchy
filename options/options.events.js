import {exportJson, exportStatic, getImportedData,
    restoreData} from "./migrate.js";
import {displayItems, reDisplay}
    from "./options.create.js";
import {persistData} from "../common/persist.js";
import {bindToElements} from "../common/bind-events.js";
import {openDialogAddCategory, openDialogAddEngine}
    from "./dialog.js";
import {toggleDarkmode} from "../common/dark.js";
import {onEditClick} from "./edit.js";

function dialogImport(categories) {
    displayItems(categories, () => {
        if (confirm("Do you want to keep these changes?")) {
            persistData({categories});
        } else {
            restoreData(categories => {
                displayItems(categories);
            });
        }
    });
}

function importData() {
    const categories = JSON.parse(getImportedData());
    chrome.runtime.sendMessage({
        cmd: 'setCategories',
        categories
    }, () => {
        dialogImport(categories);
    });
}

function addEngine() {
    openDialogAddEngine(-1, result => {
        reDisplay(result);
    });
}

function addCategory() {
    openDialogAddCategory(result => {
        reDisplay(result);
    });
}

function editObject(e) {
    const target = e.target;
    if (target.classList.contains('fa')) {
        if (target.classList.contains('eng')) {
            onEditClick(e, target, 'engine');
        }
        if (target.classList.contains('cat')) {
            onEditClick(e, target, 'category');
        }
    }
}

function getIdFromCheckbox(target) {
    const visible = target.parentElement;
    const engine = visible.parentElement;
    return engine.getAttribute('data-id');
}

function engineToggleVisible(e) {
    const target = e.target;
    chrome.runtime.sendMessage({
        cmd: 'setVisible',
        value: target.checked,
        id: getIdFromCheckbox(target)
    })
}

function initEvents() {
    bindToElements('click', [
        ['btnImportData', importData],
        ['exportData', exportJson],
        ['exportStaticData', exportStatic],
        ['addEngine', addEngine],
        ['addCategory', addCategory],
        ['toggleDark', toggleDarkmode],
        ['engines', editObject],
    ]);
    bindToElements('change', [
        ['engines', engineToggleVisible]
    ]);
}

export {initEvents}
