import config from "../common/config.js";

const key = config.storageKeyShowRecent;

function setShowRecentSetting(set) {
    chrome.storage.local.set({[key]: set}, () => {})
}

function getShowRecentSetting(cb) {
    chrome.storage.local.get([key], result => {
        cb(result[key]);
    })
}

export {setShowRecentSetting, getShowRecentSetting}
