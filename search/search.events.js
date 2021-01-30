import {getTerm, storeTerm} from "./search.term.js";
import {toggleDarkmode} from "../storage/dark.js";
import {bindToElements} from "../common/bind-events.js";
import {setNewtabSetting} from "../storage/newtab.js";
import {setShowRecentSetting} from "../storage/recent.js";
import {showRecentTerms} from "./search.recent.js";
import {enginesContextmenu} from "./search.contextmenu.js";
import {newTab, toUrl} from "./search.open.js";
import {advices} from "./search.tour.data.js";
import {beginTour} from "../common/helptour.js";

function openCategoryEngines(clickedElement) {
    const item = clickedElement.parentElement;
    const engines = item.querySelectorAll('.engine');
    const term = getTerm();
    for (let i = 0; i < engines.length; i++) {
        const a = engines[i].querySelector('a');
        newTab(a.getAttribute('data-href'), term);
    }
}

function storeSearchTerm(selectedTerm) {
    chrome.storage.local.set({selectedTerm});
}

function recentTermsOnClick(e) {
    const target = e.target;
    // console.log(target);
    if (target.id !== 'recentTerms') {
        const searchTA = document.querySelector('type-ahead');
        searchTA.search.value = target.textContent;
        searchTA.saveSearchValue()
    }
}

function openAllCategoryEngines(target) {
    const term = getTerm();
    storeSearchTerm(term);
    storeTerm(term);
    openCategoryEngines(target);
}

function enginesClick(e) {
    const target = e.target;
    const term = getTerm();
    console.log(term);
    if (target.tagName === 'A') {
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
    beginTour(advices);
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
    bindToElements('contextmenu', [
        ['engines', enginesContextmenu],
    ])
}

export {initEvents, defaultEnter, openAllCategoryEngines}
