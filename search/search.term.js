import config from "../common/config.js";

// const inputTerm = document.getElementById("term");
const inputTerm = document.getElementById("searchTypeAhead");

const key = config.storageKeyTerms;

function createOption(item) {
    const option = document.createElement('option');
    option.value = item;
    return option;
}

function initHistory(terms) {
    const historyElement = document.getElementById('history');
    historyElement.innerHTML = '';
    if (terms) {
        terms.forEach(item => {
            historyElement.appendChild(createOption(item));
        });
    }
}

function setSearchTermFromBackground() {
    chrome.runtime.sendMessage({cmd: "getSelectedTerm"},
        response => {
            setTerm(response.term);
            // inputTerm.value = response.term;
        })
}

function getTerm() {
    return inputTerm.search.value;
}

function setTerm(t) {
    // console.log(inputTerm.search);
    inputTerm.search.value = t;
}

function storeTerm() {
    let terms = JSON.parse(localStorage.getItem(key));
    if (!terms) {
        terms = [];
    }
    if (!terms.includes(getTerm())) {
        if (terms.length > config.storageMaxTerms) {
            terms.shift();
        }
        terms.push(getTerm());
        // initHistory(terms);
    }
    localStorage.setItem(key, JSON.stringify(terms));
}

function getTerms() {
    return JSON.parse(localStorage.getItem(key));
}

export {setSearchTermFromBackground, getTerm, getTerms,
    storeTerm, initHistory}
