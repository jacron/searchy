import config from "../common/config.js";

const key = config.storageKeyNewTab;

function getNewtabSetting(cb) {
    chrome.storage.local.get([key], result => {
        cb(result[key]);
    })
}

function setNewtabSetting(set) {
    chrome.storage.local.set({[key]: set}, () => {})
}

export {getNewtabSetting, setNewtabSetting}
