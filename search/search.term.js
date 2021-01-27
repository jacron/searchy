import config from "../common/config.js";

const TASearch = document.getElementById("searchTypeAhead");

const key = 'terms';  // config.storageKeyTerms; = 'terms'

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

function removeTerm(t) {
    getTerms().then(terms => {
        storeTerms(terms.filter(item => item !== t));
    })
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
    })
}

function getTerms() {
    return new Promise(resolve => {
        chrome.storage.local.get(key, res => resolve(res[key]));
    })
}

function storeTerms(terms) {
    chrome.storage.local.set({[key]: terms});
}

export {setSearchTermFromStorage, getTerm, getTerms,
    storeTerm, removeTerm}
