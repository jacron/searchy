import {exportJson} from "../export.js";
import {reDisplayEngines} from "./options.create.js";
import {bindToElements} from "../../common/bind-events.js";
import {toggleDarkmode} from "../../storage/dark.js";
import {clearClass, editEngine, onEditClick} from "../options.edit.js";
import {openDialogImport} from "../import.js";
import {openDialogAddEngine} from "../engine/engine.dialog.js";
import {openDialogAddCategory} from "../category/category.dialog.js";
import {beginTour} from "../../common/helptour.js";
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

function getTypeFromClass(classList) {
    if (classList.contains('eng')) {
        return 'engine';
    }
    if (classList.contains('cat')) {
        return 'category';
    }
}

function editObject(e) {
    const target = e.target;
    console.log(target);
    const engine = target.closest('.engine');
    if (engine) {
        // editEngine(e, target, 'engine');
        const cmd = target.closest('.cmd');
        editEngine(cmd.getAttribute('cmd'), engine);
    }
    const category = target.closest('.category');
    if (category) {

    }
    // if (target.classList.contains('fa')) {
    //     onEditClick(e, target, getTypeFromClass(target.classList));
    // }
    clearClass('opened');
}

function getIdFromCheckbox(target) {
    const visible = target.parentElement;
    const engine = visible.parentElement;
    return engine.getAttribute('data-id');
}

function engineToggleVisible(e) {
    const target = e.target;
    setVisible(getIdFromCheckbox(target), target.checked);
}

function help() {
    beginTour(advices);
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
