import {showEngineLinks} from "../options/options.create.js";

function onCategoryRemoved(response, id) {
    if (response.msg) {
        if (response.msg === 'ok') {
            showEngineLinks();
        } else if (response.msg === 'category not empty') {
            if (confirm("This category contains engines. Delete them also?")) {
                chrome.runtime.sendMessage({
                    cmd: 'removeCategory',
                    forced: true,
                    id
                }, () => {
                    showEngineLinks();
                })
            }
        }
    }
}

function removeCategory(id) {
    chrome.runtime.sendMessage({
        cmd: 'removeCategory',
        force: false,
        id
    }, response => {
        onCategoryRemoved(response, id);
    })
}

export {removeCategory}
