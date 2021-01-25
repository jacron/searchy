import {initDarkmode} from '../storage/dark.js';
import {displayEngines} from './search.create-engines.js';
import {initEvents} from "./search.events.js";
import {setSearchTermFromStorage} from "./search.term.js";
import {getNewtabSetting} from "../storage/newtab.js";
import {getShowRecentSetting} from "../storage/recent.js";
import {showRecentTerms} from "./search.recent.js";
import {beginTour, initTourEvent} from "./search.tour.js";
import {getFirstUseSetting} from "../storage/first.js";
import {initHelpTour} from "../web-components/HelpTour/HelpTour.js";
import {initTypeAhead} from "../web-components/TypeAhead/TypeAhead.js";
import {initTypeAheadEvents} from "./search.typeahead.events.js";
import {initSearchTypeAhead} from "./search.typeahead.js";
import {getCategories} from "../common/fetch.js";

function showEngineLinks() {
    getCategories().then(categories => displayEngines(categories));
}

function initNewtab() {
    getNewtabSetting().then(set => {
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

function init() {
    initHelpTour();
    initTourEvent();
    initTypeAhead();
    initSearchTypeAhead();
    initTypeAheadEvents();
    initEvents();
    setSearchTermFromStorage();
    showEngineLinks();
    initNewtab();
    initShowRecents();
    version();
    showRecentTerms();
    initFirstUseHelp();
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

initDarkmode(() => init());
