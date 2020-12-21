import {initDarkmode, toggleDarkmode} from '../common/dark.js';
import {createCategoryEnginesHtml} from './search.create.js';

function getSearchTermFromBackground() {
    chrome.runtime.sendMessage({cmd: "getSelectedTerm"},
            response => {
        document.getElementById("term").value = response.term;
    })
}

function displayEngines(categories) {
    categories.map(category => {
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'item';
        categoryDiv.innerHTML = createCategoryEnginesHtml(category);
        document.getElementById('engines').appendChild(categoryDiv);
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

function toUrl(url, term) {
    // const form = document.getElementById('formSearch');
    // form.action = url;
    // document.getElementById('searchParm').value = term;
    // form.submit();
    document.location.href = url + term;
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

init();
