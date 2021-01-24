import {getTerms} from "./search.term.js";

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
    cb(getTerms().filter(term =>
        term.toUpperCase().indexOf(q.toUpperCase()) !== -1));
}

function setTypeaheadColors() {
    const searchTA = document.querySelector('type-ahead');
    const colors = document.body.classList.contains('dark') ?
        menuColorsDark : menuColors;
    searchTA.setColors(colors);
}

function initSearchTypeAhead() {
    const searchTA = document.querySelector('type-ahead');
    searchTA.getItems = (q, cb) => fetchIt(q, cb);
    searchTA.renderLabel = obj => obj;
    setTypeaheadColors();
}

export {initSearchTypeAhead, setTypeaheadColors}
