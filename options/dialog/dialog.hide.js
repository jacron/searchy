import {hideElement} from "../../common/htmlelements.js";
import {clearSelected} from "../options.edit.js";

function hideDialogs() {
    for (let id of [
        'dialogEngine',
        'dialogCategory',
        'dialogImport',
        'dialogBackground'
    ]) {
        hideElement(id);
    }
    clearSelected();
}

export {hideDialogs}
