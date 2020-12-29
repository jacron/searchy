import {showEngineLinks} from "../options.create.js";

function removeEngine(id) {
    chrome.runtime.sendMessage({
        cmd: 'removeEngine',
        id
    }, () => {
        showEngineLinks();
    })
}

export {removeEngine}