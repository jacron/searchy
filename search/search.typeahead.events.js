import {defaultEnter} from "./search.events.js";
import {removeTerm} from "./search.term.js";

const searchTA = document.querySelector('type-ahead');

function containerClick() {
    searchTA.closeList();
}

function initTypeAheadEvents() {
    searchTA.addEventListener('enter', () =>
        defaultEnter(searchTA.search.value));
    searchTA.addEventListener('delete', () =>
        removeTerm(searchTA.search.value));
    document.querySelector('.container')
        .addEventListener('click', containerClick);
}

export {initTypeAheadEvents}
