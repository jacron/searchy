import {initEvents} from "./addEngine.events.js";
import {populateDialog} from "./addEngine.populate.js";

function init() {
    chrome.storage.local.get(['currentTab'], response =>{
        populateDialog(response.currentTab);
        initEvents(response.currentTab);
        // window.addEventListener('blur', () => {
        //     window.close();
        // })
    });
}

init();
