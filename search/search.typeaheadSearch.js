import {getTerms, storeTerms} from "./search.term.js";
import {isDarkMode} from "../storage/dark.js";
import {getTypeaheadColors} from "./search.typeahead.colors.js";
import {getTypeaheadSearch} from "./search.getElements.js";

function fetchIt(q, cb) {
    getTerms().then(terms => {
        cb(terms.filter(term =>
            term.toUpperCase().indexOf(q.toUpperCase()) !== -1));
    })
}

function setTypeaheadSearchColors() {
    const typeaheadSearch = getTypeaheadSearch();
    if (typeaheadSearch) {
        typeaheadSearch.setColors(getTypeaheadColors(isDarkMode()));
    }
}

function initTypeAheadSearch() {
    const typeaheadSearch = getTypeaheadSearch();
    typeaheadSearch.getItems = (q, cb) => fetchIt(q, cb);
    typeaheadSearch.setItems = items => storeTerms(items);
    typeaheadSearch.renderLabel = obj => obj;
    setTypeaheadSearchColors();
}

export {initTypeAheadSearch, setTypeaheadSearchColors}
