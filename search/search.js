import {initDarkmode, toggleDarkmode} from '../common/dark.js';
import {displayEngines} from './search.create.js';
import {toSearchUrl} from "./search.events.js";
import {setSearchTermFromBackground} from "./search.term.js";

function showEngineLinks() {
    chrome.runtime.sendMessage({cmd: "getCategories"},
        response => displayEngines(response.categories))
}

function toggleDarkModeEvent() {
    document.getElementById('toggleDark').addEventListener('click', () => {
        toggleDarkmode();
    })
}

function init() {
    initDarkmode();
    setSearchTermFromBackground();
    showEngineLinks();
    toggleDarkModeEvent();
    toSearchUrl();
}

chrome.runtime.onMessage.addListener((req) => {
    if (req.notify && req.notify === 'data changed') {
        showEngineLinks();
    }
})

init();
