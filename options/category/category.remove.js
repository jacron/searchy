import {showEngineLinks} from "../options/options.create.js";
import {getCategories} from "../../common/fetch.js";
import {removeCategory} from "../../common/update.js";

function askRemoveCategory(id) {
    getCategories().then(categories => {
        removeCategory(id, false, categories).then(success => {
            if (success) {
                showEngineLinks();
            } else {
                if (confirm("This category contains engines. Delete them also?")) {
                    removeCategory(id, true, categories)
                        .then(() => showEngineLinks());
                }
            }
        })
    })
}

export {askRemoveCategory}
