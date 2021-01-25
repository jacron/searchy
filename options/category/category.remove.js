import {removeCategory} from "../../common/update.js";

function askRemoveCategory(id) {
    return new Promise(resolve => {
        removeCategory(id, false).then(success => {
            if (success) {
                resolve(true);
            } else {
                if (confirm("This category contains engines. Delete them also?")) {
                    removeCategory(id, true).then(() => {
                            resolve(true);
                        });
                } else {
                    resolve(false);
                }
            }
        })
    })
}

export {askRemoveCategory}
