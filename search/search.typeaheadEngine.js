import {isDarkMode} from "../storage/dark.js";
import {getTypeaheadColors} from "./search.typeahead.colors.js";
import {getTypeAheadEngine} from "./search.getElements.js";

function setTypeaheadEngineColors() {
    const typeAheadEngine = getTypeAheadEngine();
    if (typeAheadEngine) {
        typeAheadEngine.setColors(getTypeaheadColors(isDarkMode()));
    }
}

export {setTypeaheadEngineColors}
