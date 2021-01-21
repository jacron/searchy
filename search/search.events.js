import {getTerm, storeTerm} from "./search.term.js";
import {toggleDarkmode} from "../storage/dark.js";
import {bindToElements} from "../common/bind-events.js";
import {getNewtabSetting, setNewtabSetting} from "../storage/newtab.js";
import {setShowRecentSetting} from "../storage/recent.js";
import {showRecentTerms} from "./search.recent.js";
import {beginTour} from "./search.tour.js";

const searchTA = document.querySelector('type-ahead');
// console.log(searchTA);

function fillPlaceholder(url, term) {
    const magic = '%s';
    if (url.indexOf(magic) !== -1) {
        return url.replace(magic, term);
    } else {
        return url + term;
    }
}

function toUrl(url, term) {
    getNewtabSetting(set => {
        if (set) {
            newTab(url, term);
        } else {
            document.location.href = fillPlaceholder(url, term);
        }
    })
}

function newTab(url, term) {
    chrome.tabs.create({
        url: fillPlaceholder(url, term)
    })
}

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
    // console.log(target);
    if (target.id !== 'recentTerms') {
        document.getElementById('term').value = target.textContent;
    }
}

function openEngines(e) {
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

function defaultEnter(term) {
    const defaultEngine = document.querySelector('.default');
    if (defaultEngine) {
        setSearchTerm(term, () => {
            storeTerm(term);
            toUrl(defaultEngine.getAttribute('data-href'), term)
        });
    }
}

function onInputKey(e) {
    if (e.key === 'Enter') {
        defaultEnter(getTerm());
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

function cmdSearch() {
    defaultEnter(getTerm());
}

function containerClick() {
    searchTA.closeList();
}

function initEvents() {
    bindToElements('click', [
        ['engines', openEngines],
        ['toggleDark', toggleDarkmode],
        ['pageOptions', pageOptions],
        ['recentTerms', recentTerms],
        ['help', beginTour],
    ]);
    // bindToElements('keyup', [
    //     ['term', onInputKey],
    // ]);
    bindToElements('change', [
        ['newTab', setNewTab],
        ['toggleRecent', toggleRecent]
    ]);
    searchTA.addEventListener('select', itemSelected);
    searchTA.addEventListener('enter', itemEntered);
    document.querySelector('.cmd-search').addEventListener('click', cmdSearch);
    document.querySelector('.container').addEventListener('click', containerClick);
}

function itemSelected(e) {
    e.detail.search.value = e.detail.label;
}

function itemEntered(e) {
    // defaultEnter(e.detail.search.value);
    defaultEnter(searchTA.search.value);
}

function initTypeAheadEvents() {
    searchTA.addEventListener('select', itemSelected);
    searchTA.addEventListener('enter', itemEntered);
}

export {initEvents, initTypeAheadEvents}
