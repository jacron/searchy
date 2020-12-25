import config from '../common/config.js';

const key = config.storageKeyDefault;

function getDefaultEngineId(cb) {
    chrome.storage.local.get([key], result => {
        cb(result[key]);
    })
}

function notifyChange() {
    // console.log('notifying default set...');
    chrome.runtime.sendMessage({
        notify: 'default engine set'
    })
}

function setDefaultEngineId(id) {
    chrome.storage.local.set({[key]: id}, () => {
        notifyChange();
    })
}

export {getDefaultEngineId, setDefaultEngineId}
