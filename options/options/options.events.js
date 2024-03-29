import {exportJson} from "../export.js";
import {reDisplayEngines} from "./options.create.js";
import {bindToElements} from "../../common/bind-events.js";
import {toggleDarkmode} from "../../storage/dark.js";
import {clearClass, editEngine, editCategory} from "../options.edit.js";
import {openDialogImport} from "../import.js";
import {openDialogAddEngine} from "../engine/engine.dialog.js";
import {openDialogAddCategory} from "../category/category.dialog.js";
import {beginTour} from "../../common/helptour/helptour.js";
import {setVisible} from "../../common/update.js";
import {notifysearchy} from "../../common/notifysearchy.js";
import {advices} from "./options.tour.data.js";

function addEngine() {
    openDialogAddEngine(-1, result => {
        reDisplayEngines(result);
        notifysearchy();
    });
}

function importJson() {
    openDialogImport();
}

function addCategory() {
    openDialogAddCategory(result => {
        reDisplayEngines(result);
        notifysearchy();
    });
}

// function getTypeFromClass(classList) {
//     if (classList.contains('eng')) {
//         return 'engine';
//     }
//     if (classList.contains('cat')) {
//         return 'category';
//     }
// }

function editObject(e) {
    const target = e.target;
    const engine = target.closest('.engine');
    if (engine) {
        const cmd = target.closest('.cmd');
        if (cmd) {
            editEngine(cmd.getAttribute('cmd'), engine);
        }
    }
    const category = target.closest('.category');
    if (category) {
        const cmd = target.closest('.cmd');
        if (cmd) {
            editCategory(cmd.getAttribute('cmd'), category);
        }
    }
    clearClass('opened');
}

function getIdFromCheckbox(engineOrCategory) {
    return engineOrCategory.getAttribute('data-id');
}

function engineToggleVisible(e) {
    const target = e.target;
    const visible = target.parentElement;
    const engineOrCategory = visible.parentElement;
    setVisible(getIdFromCheckbox(engineOrCategory), target.checked, engineOrCategory.className);
}

function help() {
    beginTour(advices, 'options');
}

function enginesContextmenu(e) {
    // console.log(e.target);
    clearClass('opened');
    if (e.target.classList.contains('name')) {
        const category = e.target.closest('.category');
        if (category) {
            category.classList.add('opened');
            e.preventDefault();
        }
        const engine = e.target.closest('.engine');
        if (engine) {
            engine.classList.add('opened');
            e.preventDefault();
        }
    }
}

function initEvents() {
    bindToElements('click', [
        ['exportData', exportJson],
        ['importData', importJson],
        ['addEngine', addEngine],
        ['addCategory', addCategory],
        ['toggleDark', toggleDarkmode],
        ['engines', editObject],
        ['help', help],
    ]);
    bindToElements('change', [
        ['engines', engineToggleVisible]
    ]);
    bindToElements('contextmenu', [
        ['engines', enginesContextmenu]
    ])
}

export {initEvents}
