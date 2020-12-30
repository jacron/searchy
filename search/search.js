import {initDarkmode} from '../storage/dark.js';
import {displayEngines} from './search.create.js';
import {initEvents} from "./search.events.js";
import {setSearchTermFromBackground} from "./search.term.js";
import {getNewtabSetting} from "../storage/newtab.js";

function showEngineLinks() {
    chrome.runtime.sendMessage({cmd: "getCategories"},
        response => displayEngines(response.categories))
}

function initNewtab() {
    getNewtabSetting(set => {
        if (set) {
            document.getElementById('newTab').checked = set
        }
    });
}

function version() {
    const manifestData = chrome.runtime.getManifest();
    console.log('v' + manifestData.version);
}

function init() {
    initDarkmode();
    setSearchTermFromBackground();
    showEngineLinks();
    initEvents();
    initNewtab();
    version();
}

chrome.runtime.onMessage.addListener(req => {
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
