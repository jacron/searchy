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
        console.log({set});
        if (set) {
            document.getElementById('newTab').checked = set
        }
    });
}

function init() {
    initDarkmode();
    setSearchTermFromBackground();
    showEngineLinks();
    initEvents();
    initNewtab();
}

chrome.runtime.onMessage.addListener(req => {
    // console.log({req});
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
