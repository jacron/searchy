import config from "../common/config.js";

const key = config.storageKeyFirstUseOptions;

function setFirstUseSetting(set) {
    chrome.storage.local.set({[key]: set}, () => {})
}

function getFirstUseSetting(cb) {
    chrome.storage.local.get([key], result => {
        cb(result[key]);
    })
}

export {setFirstUseSetting, getFirstUseSetting}
