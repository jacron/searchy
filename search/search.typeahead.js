import {getTerms, storeTerms} from "./search.term.js";
import {isDarkMode} from "../storage/dark.js";

const menuColors = {
    bgInput: '#fff',
    colInput: '#333',
    bgTitle: '#fff',
    colTitle: '#333',
    bgSelected: '#eee'
}

const menuColorsDark = {
    bgInput: '#111',
    colInput: '#ccc',
    bgTitle: '#292a2d',
    colTitle: '#eee',
    bgSelected: '#4b4c4f'
}

function fetchIt(q, cb) {
    getTerms().then(terms => {
        cb(terms.filter(term =>
            term.toUpperCase().indexOf(q.toUpperCase()) !== -1));
    })
}

function setTypeaheadColors() {
    const searchTA = document.querySelector('type-ahead');
    if (searchTA) {
        const colors = isDarkMode() ? menuColorsDark : menuColors;
        searchTA.setColors(colors);
    }
}

function initSearchTypeAhead() {
    const searchTA = document.querySelector('type-ahead');
    searchTA.getItems = (q, cb) => fetchIt(q, cb);
    searchTA.setItems = items => storeTerms(items);
    searchTA.renderLabel = obj => obj;
    setTypeaheadColors();
}

export {initSearchTypeAhead, setTypeaheadColors}
