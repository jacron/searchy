import {getTerm} from "./search.term.js";
import {toggleDarkmode} from "../storage/dark.js";
import {bindToElements} from "../common/bind-events.js";

function fillPlaceholder(url, term) {
    const magic = '$!q';
    if (url.indexOf(magic) !== -1) {
        return url.replace(magic, term);
    } else {
        return url + term;
    }
}

function toUrl(url, term) {
    document.location.href = fillPlaceholder(url, term);
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
        newTab(a.href, term);
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

function toSearchUrl(e) {
    const target = e.target;
    const term = getTerm();
    if (target.tagName === 'A') {
        setSearchTerm(term, () => toUrl(target.href, term));
        e.preventDefault();
    }
    if (target.classList.contains('category-title')) {
        setSearchTerm(term, () => openCategoryEngines(target));
        e.preventDefault();
    }
}

function onInputKey(e) {
    if (e.key === 'Enter') {
        const defaultEngine = document.querySelector('.default');
        if (defaultEngine) {
            const term = getTerm();
            setSearchTerm(term, () => toUrl(defaultEngine.href, term));
        }
    }
}

function onSubmit(e) {
    e.preventDefault();
}

function initEvents() {
    bindToElements('click', [
        ['engines', toSearchUrl],
        ['toggleDark', toggleDarkmode],
    ]);
    bindToElements('keyup', [
        ['term', onInputKey],
    ]);
    bindToElements('submit', [
        ['searchForm', onSubmit]
    ])
}

export {initEvents}
