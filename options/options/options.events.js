import {exportJson} from "../export.js";
import {reDisplayEngines} from "./options.create.js";
import {bindToElements} from "../../common/bind-events.js";
import {toggleDarkmode} from "../../storage/dark.js";
import {onEditClick} from "../options.edit.js";
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
    if (target.classList.contains('fa')) {
        onEditClick(e, target, getTypeFromClass(target.classList));
    }
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
}

export {initEvents}
