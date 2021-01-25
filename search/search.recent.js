import {getTerms} from "./search.term.js";
import {getShowRecentSetting} from "../storage/recent.js";

function createRecentTerm(term) {
    const row = document.createElement('div');
    row.innerText = term;
    return row;
}

function displayRecentTerms(elementRecentTerms) {
    getTerms().then(terms => {
        if (terms) {
            elementRecentTerms.innerHTML = '';
            terms
                .slice(-30)
                .reverse()
                .forEach(term => {
                    elementRecentTerms.appendChild(createRecentTerm(term));
                })
        } else {
            elementRecentTerms.innerHTML = 'You have not searched yet...';
        }
    })
}

function showRecentTerms() {
    const elementRecentTerms = document.getElementById('recentTerms');
    getShowRecentSetting(set => {
        if (set) {
            displayRecentTerms(elementRecentTerms);
        } else {
            elementRecentTerms.innerHTML = '';
        }
    })
}

export {showRecentTerms}
