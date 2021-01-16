import {initDarkmode} from '../storage/dark.js';
import {displayEngines} from './search.create-engines.js';
import {initEvents} from "./search.events.js";
import {getTerms, initHistory, setSearchTermFromBackground} from "./search.term.js";
import {getNewtabSetting} from "../storage/newtab.js";
import {getShowRecentSetting} from "../storage/recent.js";
import {showRecentTerms} from "./search.recent.js";

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

function initShowRecents() {
    getShowRecentSetting(set => {
        if (set) {
            document.getElementById('toggleRecent').checked = set
        }
    })
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
    initShowRecents();
    version();
    initHistory(getTerms());
    showRecentTerms();
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
