import {showEngineLinks} from './options.create.js';
import {initDarkmode} from '../storage/dark.js';
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

chrome.runtime.onMessage.addListener(req => {
    console.log({req});
    if (req.notify) {
        switch(req.notify) {
            case 'data changed':
            case 'default engine set':
                showEngineLinks();
                break;
        }
    }
})

init();
