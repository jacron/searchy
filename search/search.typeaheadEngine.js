import {isDarkMode} from "../storage/dark.js";
import {getTypeaheadColors} from "./search.typeahead.colors.js";
import {getTypeAheadEngine} from "./search.getElements.js";
import {getCategories} from "../common/fetch.js";

function fetchIt(q, cb) {
    getCategories().then(categories => {
        const found = [];
        q = q.toUpperCase();
        for (let category of categories) {
            found.push(...category.engines
                .filter(engine =>
                    engine.name.toUpperCase().indexOf(q) === 0));
        }
        cb(found);
    })
}

function setTypeaheadEngineColors() {
    const typeAheadEngine = getTypeAheadEngine();
    if (typeAheadEngine) {
        typeAheadEngine.setColors(getTypeaheadColors(isDarkMode()));
    }
}

function initTypeAheadEngine() {
    const typeAheadEngine = getTypeAheadEngine();
    typeAheadEngine.getItems = (q, cb) => fetchIt(q, cb);
    // typeAheadEngine.setItems = items => storeIt(items);
    typeAheadEngine.renderLabel = obj => obj;
    setTypeaheadEngineColors();
}

export {initTypeAheadEngine, setTypeaheadEngineColors}
