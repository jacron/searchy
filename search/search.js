import {initDarkmode} from '../storage/dark.js';
import {displayEngines} from './search.create-engines.js';
import {initEvents, initTypeAheadEvents} from "./search.events.js";
import {getTerms, initHistory, setSearchTermFromBackground} from "./search.term.js";
import {getNewtabSetting} from "../storage/newtab.js";
import {getShowRecentSetting} from "../storage/recent.js";
import {showRecentTerms} from "./search.recent.js";
import {beginTour, initTourEvent} from "./search.tour.js";
import {getFirstUseSetting} from "../storage/first.js";
import {initHelpTour} from "../components/HelpTour/HelpTour.js";
import {initTypeAhead} from "../components/TypeAhead/TypeAhead.js";

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

function initFirstUseHelp() {
    getFirstUseSetting(set => {
        if (!set) {
            beginTour();
        }
    });

}

function version() {
    const manifestData = chrome.runtime.getManifest();
    console.log('v' + manifestData.version);
}

function fetchIt(q, cb) {
    cb(getTerms().filter(term => term.indexOf(q) !== -1));
}

function initSearchTypeAhead() {
    const searchTA = document.querySelector('type-ahead');
    searchTA.getItems = (q, cb) => fetchIt(q, cb);
    searchTA.renderLabel = obj => obj;
}

function init() {
    initHelpTour();
    initTourEvent();
    initDarkmode();
    setSearchTermFromBackground();
    showEngineLinks();
    initEvents();
    initNewtab();
    initShowRecents();
    version();
    initHistory(getTerms());
    showRecentTerms();
    initFirstUseHelp();
    initTypeAhead();
    initSearchTypeAhead();
    initTypeAheadEvents();
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
