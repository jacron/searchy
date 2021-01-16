import {getTerms} from "./search.term.js";
import {getShowRecentSetting} from "../storage/recent.js";

function createRecentTerm(term) {
    const row = document.createElement('div');
    row.innerText = term;
    return row;
}

function displayRecentTerms(elementRecentTerms) {
    getTerms()
        // .slice(-7)
        .reverse()
        .forEach(term => {
            elementRecentTerms.appendChild(createRecentTerm(term));
        })
}

function showRecentTerms() {
    const elementRecentTerms = document.getElementById('recentTerms');
    elementRecentTerms.innerHTML = '';
    getShowRecentSetting(set => {
        if (set) {
            displayRecentTerms(elementRecentTerms);
        }
    })
}

export {showRecentTerms}
