import config from "../common/config.js";

// const inputTerm = document.getElementById("term");
const TASearch = document.getElementById("searchTypeAhead");

const key = config.storageKeyTerms;

function setSearchTermFromBackground() {
    chrome.storage.local.get(['selectedTerm'], res => setTerm(res.selectedTerm));
    // chrome.runtime.sendMessage({cmd: "getSelectedTerm"},
    //     response => {
    //         setTerm(response.term);
    //         // inputTerm.value = response.term;
    //     })
}

function getTerm() {
    return TASearch.search.value.trim();
}

function setTerm(t) {
    // console.log(inputTerm.search);
    TASearch.search.value = t;
}

function storeTerm() {
    let terms = JSON.parse(localStorage.getItem(key));
    if (!terms) {
        terms = [];
    }
    const term = getTerm();
    if (!terms.includes(term)) {
        if (terms.length > config.storageMaxTerms) {
            terms.shift();
        }
        terms.push(term);
    }
    localStorage.setItem(key, JSON.stringify(terms));
}

function getTerms() {
    return JSON.parse(localStorage.getItem(key));
}

export {setSearchTermFromBackground, getTerm, getTerms,
    storeTerm}
