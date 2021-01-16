const inputTerm = document.getElementById("term");

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
            inputTerm.value = response.term;
        })
}

function getTerm() {
    return inputTerm.value;
}

function storeTerm() {
    let terms = JSON.parse(localStorage.getItem('terms'));
    if (!terms) {
        terms = [];
    }
    if (!terms.includes(getTerm())) {
        terms.push(getTerm());
        initHistory(terms);
    }
    localStorage.setItem('terms', JSON.stringify(terms));
}

function getTerms() {
    return JSON.parse(localStorage.getItem('terms'));
}

export {setSearchTermFromBackground, getTerm, getTerms,
    storeTerm, initHistory}
