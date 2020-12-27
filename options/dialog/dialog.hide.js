import {hideElement} from "../../common/htmlelements.js";
import {clearSelected} from "../edit.js";

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
