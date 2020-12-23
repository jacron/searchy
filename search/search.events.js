import {getTerm} from "./search.term.js";

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

function toSearchUrl() {
    document.getElementById('engines').addEventListener('click', e => {
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
    })
}

export {toSearchUrl}
