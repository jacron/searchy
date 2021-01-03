import {initEvents} from "./addEngine.events.js";
import {populateDialog} from "./addEngine.populate.js";

function init() {
    chrome.runtime.sendMessage({cmd: 'getCurrentTab'}, response => {
        populateDialog(response.currentTab);
        initEvents(response.currentTab);
        window.addEventListener('blur', () => {
            window.close();
        })
    })
}

init();
