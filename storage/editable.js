/* toggleEdit()
Turn editable on/off
to show/hide the checkboxes beside categories and engines.
Method: add/remove class from engines container.
 */
import config from "../common/config.js";

function toggleEdit(e) {
    const target = e.target;
    const key = config.storageKeyEditmode;
    const newValue = target.checked;
    const container = document.getElementById('engines');
    chrome.storage.local.set({[key]: newValue}, () => {
        container.className = newValue ? 'editable' : '';
    })
}

function initEditable() {
    const key = config.storageKeyEditmode;
    const container = document.getElementById('engines');
    chrome.storage.local.get([key], results => {
        container.className = results[key] ? 'editable' : '';
    })
}

export {toggleEdit, initEditable}
