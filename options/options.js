import {showEngineLinks} from './options.create.js';
import {initDarkmode} from '../common/dark.js';
import {initFilesInput} from '../components/FilesInput/FilesInput.js';
import {initEvents} from "./options.events.js";
import {initImport} from "./migrate.js";

function init() {
    initDarkmode();
    showEngineLinks();
    initFilesInput();
    initImport();
    initEvents();
}

chrome.runtime.onMessage.addListener((req) => {
    if (req.notify && req.notify === 'data changed') {
        showEngineLinks();
    }
})

init();
