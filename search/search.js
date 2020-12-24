import {initDarkmode} from '../storage/dark.js';
import {displayEngines} from './search.create.js';
import {initEvents} from "./search.events.js";
import {setSearchTermFromBackground} from "./search.term.js";

function showEngineLinks() {
    chrome.runtime.sendMessage({cmd: "getCategories"},
        response => displayEngines(response.categories))
}

function init() {
    initDarkmode();
    setSearchTermFromBackground();
    showEngineLinks();
    initEvents();
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
