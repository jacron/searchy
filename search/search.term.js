import config from "../common/config.js";

const TASearch = document.getElementById("searchTypeAhead");

const key = config.storageKeyTerms;

function setSearchTermFromStorage() {
    chrome.storage.local.get(['selectedTerm'], res =>
        setTerm(res.selectedTerm));
}

function getTerm() {
    return TASearch.search.value.trim();
}

function setTerm(t) {
    if (t === 'undefined') {
        t = '';
    }
    TASearch.search.value = t;
}

function storeTerm(term) {
    getTerms().then(terms => {
        if (!terms) {
            terms = [];
        }
        if (!terms.includes(term)) {
            if (terms.length > config.storageMaxTerms) {
                terms.shift();
            }
            terms.push(term);
        }
        storeTerms(terms);
        // localStorage.setItem(key, JSON.stringify(terms));
    })
    // let terms = JSON.parse(localStorage.getItem(key));
}

function getTerms() {
    return new Promise(resolve => {
        chrome.storage.local.get(key, res => resolve(res[key]));
    })
    // return JSON.parse(localStorage.getItem(key));
}

function storeTerms(terms) {
    chrome.storage.local.set({[key]: terms});
}

export {setSearchTermFromStorage, getTerm, getTerms,
    storeTerm}
