import {initEvents} from './popup.events.js';
import {setCurrentTab} from "./popup.currenttab.js";

// function version() {
//     const manifestData = chrome.runtime.getManifest();
//     document.getElementById('version').innerText =
//         'v' + manifestData.version;
// }

function init() {
    // version();
    setCurrentTab();
    initEvents();
}

init();