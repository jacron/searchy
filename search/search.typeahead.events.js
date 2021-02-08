import {defaultEnter} from "./search.events.js";
import {getTypeAheadEngine, getTypeaheadSearch} from "./search.getElements.js";

function containerClick() {
    getTypeaheadSearch().closeList();
}

function engineTypeaheadEntered(e) {
    console.log(e);

}

function initTypeAheadEvents() {
    getTypeaheadSearch().addEventListener('enter', () =>
        defaultEnter(getTypeaheadSearch().search.value));
    console.log(getTypeAheadEngine());
    getTypeAheadEngine().addEventListener('enter', engineTypeaheadEntered);
    document.querySelector('.container')
        .addEventListener('click', containerClick, true);
}

export {initTypeAheadEvents}
