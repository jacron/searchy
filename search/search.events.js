import {getTerm, storeTerm} from "./search.term.js";
import {toggleDarkmode} from "../storage/dark.js";
import {bindToElements} from "../common/bind-events.js";
import {setNewtabSetting} from "../storage/newtab.js";
import {setShowRecentSetting} from "../storage/recent.js";
import {showRecentTerms} from "./search.recent.js";
import {newTab, toUrl} from "./search.open.js";
import {advices} from "./search.tour.data.js";
import {beginTour} from "../common/helptour/helptour.js";
import {getTypeaheadSearch} from "./search.getElements.js";

function storeSearchTerm(selectedTerm) {
    chrome.storage.local.set({selectedTerm}).then();
}

function recentTermsOnClick(e) {
    const target = e.target;
    if (target.id !== 'recentTerms') {
        const searchTA = getTypeaheadSearch();
        searchTA.search.value = target.textContent;
        searchTA.saveSearchValue(target.textContent);
    }
}

/**
 * enginesClick is gebonden aan de categoryDiv
 * @param e
 */
function enginesClick(e) {
    const target = e.target;
    if (target.tagName === 'A') {
        const term = getTerm();
        storeSearchTerm(term);
        storeTerm(term);
        toUrl(target.getAttribute('data-href'), term);
        e.preventDefault();
    }
}

function setNewTab(e) {
    setNewtabSetting(e.target.checked);
}

function toggleRecent(e) {
    const target = e.target;
    setShowRecentSetting(target.checked);
    showRecentTerms();
}

function pageOptions() {
    const term = getTerm();
    storeSearchTerm(term);
    storeTerm(term);
}

function defaultEnter(term) {
    const defaultEngine = document.querySelector('.default');
    if (defaultEngine) {
        storeSearchTerm(term);
        storeTerm(term);
        toUrl(defaultEngine.getAttribute('data-href'), term)
    }
}

function help() {
    beginTour(advices, 'search');
}

function initEvents() {
    bindToElements('click', [
        ['engines', enginesClick],
        ['toggleDark', toggleDarkmode],
        ['pageOptions', pageOptions],
        ['recentTerms', recentTermsOnClick],
        ['help', help],
    ]);
    bindToElements('change', [
        ['newTab', setNewTab],
        ['toggleRecent', toggleRecent]
    ]);
}

export {initEvents, defaultEnter, enginesClick}
