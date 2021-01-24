import config from "../common/config.js";
// import {getCategoriesFromStorage} from "../common/persist.js";
import {downloadJson} from "../common/download.js";
import {getCategories} from "../background/fetch.js";
// import {categories} from "../initial_data old";

function exportJson() {
    const filename = config.transportFileNameJson;
    getCategories().then(categories => downloadJson(categories, filename));
    // getCategoriesFromStorage(data => {
    //     downloadJson(data, filename);
    // })
}

export {exportJson}
