import {defaultEnter} from "./search.events.js";

const searchTA = document.querySelector('type-ahead');

function containerClick() {
    searchTA.closeList();
}

function initTypeAheadEvents() {
    searchTA.addEventListener('enter', () =>
        defaultEnter(searchTA.search.value));
    document.querySelector('.container')
        .addEventListener('click', containerClick, true);
}

export {initTypeAheadEvents}
