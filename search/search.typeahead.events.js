import {defaultEnter} from "./search.events.js";
import {getTypeAheadEngine, getTypeaheadSearch} from "./search.getElements.js";
import {toUrl} from "./search.open.js";
import {getEngineById} from "../common/fetch.js";

function containerClick() {
    getTypeAheadEngine() && getTypeAheadEngine().closeList();
}

function engineTypeaheadEntered(e) {
    getEngineById(e.detail.id).then(engine => {
        const term = getTypeaheadSearch().search.value;
        console.log(engine, term);
        toUrl(engine.url, term);
    });
}

function initTypeAheadEvents(selector) {
    getTypeaheadSearch().addEventListener('enter', () =>
        defaultEnter(getTypeaheadSearch().search.value));
    getTypeAheadEngine() && getTypeAheadEngine()
        .addEventListener('enter', engineTypeaheadEntered);
    document.querySelector(selector)
        .addEventListener('click', containerClick, true);
}

export {initTypeAheadEvents}
