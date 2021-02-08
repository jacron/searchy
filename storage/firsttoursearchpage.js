import config from "../common/config.js";

const key = config.storageKeyFirstUse;

function setFirstUseSettingSearchpage(set) {
    chrome.storage.local.set({[key]: set}, () => {})
}

function getFirstUseSettingSearchpage(cb) {
    chrome.storage.local.get([key], result => {
        cb(result[key]);
    })
}

export {getFirstUseSettingSearchpage, setFirstUseSettingSearchpage}
