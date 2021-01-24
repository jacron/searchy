import {showEngineLinks} from "../options/options.create.js";
import {getCategories} from "../../background/fetch.js";
import {removeCategory} from "../../background/update.js";
// import {categories} from "../../initial_data old";

// function onCategoryRemoved(response, id) {
//     if (confirm("This category contains engines. Delete them also?")) {
//         chrome.runtime.sendMessage({
//             cmd: 'removeCategory',
//             forced: true,
//             id
//         }, () => {
//             showEngineLinks();
//         })
//     }
// }

function askRemoveCategory(id) {
    getCategories().then(categories => {
        if (removeCategory(id, false, categories)) {
            showEngineLinks();
        } else {
            if (confirm("This category contains engines. Delete them also?")) {
                removeCategory(id, true, categories);
                showEngineLinks();
            }
        }
    })

    // chrome.storage.local.get(['categories'], res => {
    //     const msg = removeCategory(request.id, request.forced, res.categories) ?
    //         'ok' : 'category not empty';
    //     // sendResponse({msg});
    // })

    // chrome.runtime.sendMessage({
    //     cmd: 'removeCategory',
    //     force: false,
    //     id
    // }, response => {
    //     onCategoryRemoved(response, id);
    // })
}

export {askRemoveCategory}
