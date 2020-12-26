import config from "../common/config.js";
import {getDataFromStorage} from "../common/persist.js";
import {downloadJson} from "../common/download.js";

function exportJson() {
    const filename = config.transportFileNameJson;
    getDataFromStorage(data => {
        downloadJson(data, filename);
    })
}

export {exportJson}
