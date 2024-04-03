/* toggleEdit()
Turn editable on/off
to show/hide the checkboxes beside categories and engines.
Method: add/remove class from engines container.
 */
import config from "../common/config.js";
import {showEngineLinks} from "../options/options/options.create.js";

function toggleEdit(e) {
    const target = e.target;
    const key = config.storageKeyEditmode;
    const newValue = target.checked;
    const container = document.getElementById('engines');
    chrome.storage.local.set({[key]: newValue}, () => {
        container.className = newValue ? 'editable' : '';
    })
    showEngineLinks();
}

function initEditable() {
    const key = config.storageKeyEditmode;
    const container = document.getElementById('engines');
    const checkbox = document.getElementById('toggleEdit');
    chrome.storage.local.get([key], results => {
        container.className = results[key] ? 'editable' : '';
        checkbox.checked = results[key];
    })
}

export {toggleEdit, initEditable}
