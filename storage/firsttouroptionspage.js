import config from "../common/config.js";

const key = config.storageKeyFirstUseOptions;

function setFirstUseSettingOptionspage(set) {
    console.log(set);
    chrome.storage.local.set({[key]: set}, () => {})
}

function getFirstUseSettingOptionspage(cb) {
    chrome.storage.local.get([key], result => {
        console.log(result);
        cb(result[key]);
    })
}

export {setFirstUseSettingOptionspage, getFirstUseSettingOptionspage}
