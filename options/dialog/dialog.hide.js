import {hideElement} from "../../common/htmlelements.js";

function hideDialogs() {
    for (let id of [
        'dialogEngine',
        'dialogCategory',
        'dialogImport',
        'dialogBackground'
    ]) {
        hideElement(id);
    }
}

export {hideDialogs}
