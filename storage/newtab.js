import config from "../common/config.js";

const key = config.storageKeyNewTab;

function getNewtabSetting() {
    return new Promise((resolve) => {
        chrome.storage.local.get(key, result => resolve(result.key))
    })
}

function setNewtabSetting(set) {
    chrome.storage.local.set({[key]: set});
}

export {getNewtabSetting, setNewtabSetting}
