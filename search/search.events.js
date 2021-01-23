import {getTerm, storeTerm} from "./search.term.js";
import {toggleDarkmode} from "../storage/dark.js";
import {bindToElements} from "../common/bind-events.js";
import {setNewtabSetting} from "../storage/newtab.js";
import {setShowRecentSetting} from "../storage/recent.js";
import {showRecentTerms} from "./search.recent.js";
import {beginTour} from "./search.tour.js";
import {enginesContextmenu} from "./search.contextmenu.js";
import {newTab, toUrl} from "./search.open.js";

function openCategoryEngines(clickedElement) {
    const item = clickedElement.parentElement;
    const engines = item.querySelectorAll('.engine');
    const term = getTerm();
    for (let i = 0; i < engines.length; i++) {
        const a = engines[i].querySelector('a');
        newTab(a.getAttribute('data-href'), term);
    }
}

function setSearchTerm(term, cb) {
    chrome.runtime.sendMessage({
        cmd: 'setSearchTerm',
        term
    }, () => {
        cb();
    })
}

function recentTerms(e) {
    const target = e.target;
    if (target.id !== 'recentTerms') {
        document.getElementById('term').value = target.textContent;
    }
}

function enginesClick(e) {
    const target = e.target;
    const term = getTerm();
    if (target.tagName === 'A') {
        setSearchTerm(term, () => {
            storeTerm(term);
            toUrl(target.getAttribute('data-href'), term);
        });
        e.preventDefault();
    }
    if (target.classList.contains('category-title')) {
        setSearchTerm(term, () => {
            storeTerm(term);
            openCategoryEngines(target);
        });
        e.preventDefault();
    }
}

function setNewTab(e) {
    const target = e.target;
    setNewtabSetting(target.checked);
}

function toggleRecent(e) {
    const target = e.target;
    setShowRecentSetting(target.checked);
    showRecentTerms();
}

function pageOptions() {
    const term = getTerm();
    setSearchTerm(term, () => {
        storeTerm(term);
    });
}

function defaultEnter(term) {
    const defaultEngine = document.querySelector('.default');
    if (defaultEngine) {
        setSearchTerm(term, () => {
            storeTerm(term);
            toUrl(defaultEngine.getAttribute('data-href'), term)
        });
    }
}

function initEvents() {
    bindToElements('click', [
        ['engines', enginesClick],
        ['toggleDark', toggleDarkmode],
        ['pageOptions', pageOptions],
        ['recentTerms', recentTerms],
        ['help', beginTour],
    ]);
    bindToElements('change', [
        ['newTab', setNewTab],
        ['toggleRecent', toggleRecent]
    ]);
    bindToElements('contextmenu', [
        ['engines', enginesContextmenu],
    ])
}

export {initEvents, defaultEnter}
