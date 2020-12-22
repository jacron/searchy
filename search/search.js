import {initDarkmode, toggleDarkmode} from '../common/dark.js';
import {createCategoryEnginesHtml} from './search.create.js';

function getSearchTermFromBackground() {
    chrome.runtime.sendMessage({cmd: "getSelectedTerm"},
            response => {
        document.getElementById("term").value = response.term;
    })
}

function displayEngines(categories) {
    const elementEngines = document.getElementById('engines');
    elementEngines.innerHTML = '';
    categories.map(category => {
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'item';
        categoryDiv.innerHTML = createCategoryEnginesHtml(category);
        elementEngines.appendChild(categoryDiv);
    })
}

function showEngineLinks() {
    chrome.runtime.sendMessage({cmd: "getCategories"},
        response => displayEngines(response.categories))
}

function toggleDarkModeEvent() {
    document.getElementById('toggleDark').addEventListener('click', () => {
        toggleDarkmode();
    })
}

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

function toSearchUrl() {
    document.getElementById('engines').addEventListener('click', e => {
        const target = e.target;
        const term = document.getElementById("term").value;
        if (target.tagName === 'A') {
            chrome.runtime.sendMessage({
                cmd: 'setSearchTerm',
                term
            }, () => {
                toUrl(target.href, term);
            })
            e.preventDefault();
        }
    })
}

function init() {
    initDarkmode();
    getSearchTermFromBackground();
    showEngineLinks();
    toggleDarkModeEvent();
    toSearchUrl();
}

chrome.runtime.onMessage.addListener((req, sender) => {
    if (req.notify && req.notify === 'data changed') {
        showEngineLinks();
    }
})

init();
