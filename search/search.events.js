import {getTerm, storeTerm} from "./search.term.js";
import {toggleDarkmode} from "../storage/dark.js";
import {bindToElements} from "../common/bind-events.js";
import {getNewtabSetting, setNewtabSetting} from "../storage/newtab.js";
import {setShowRecentSetting} from "../storage/recent.js";
import {showRecentTerms} from "./search.recent.js";
import {beginTour, nextAdvice, skipTour} from "./search.tour.js";

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

function onInputKey(e) {
    if (e.key === 'Enter') {
        const defaultEngine = document.querySelector('.default');
        if (defaultEngine) {
            const term = getTerm();
            setSearchTerm(term, () => {
                storeTerm(term);
                toUrl(defaultEngine.href, term)
            });
        }
    }
}

function onSubmit(e) {
    e.preventDefault();
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

function initEvents() {
    bindToElements('click', [
        ['engines', openEngines],
        ['toggleDark', toggleDarkmode],
        ['pageOptions', pageOptions],
        ['recentTerms', recentTerms],
        ['nextAdvice', nextAdvice],
        ['skipTour', skipTour],
        ['help', beginTour],
    ]);
    bindToElements('keyup', [
        ['term', onInputKey],
    ]);
    bindToElements('submit', [
        ['searchForm', onSubmit]
    ])
    bindToElements('change', [
        ['newTab', setNewTab],
        ['toggleRecent', toggleRecent]
    ]);
}

export {initEvents}
