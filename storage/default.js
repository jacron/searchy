import config from '../common/config.js';

const key = config.storageKeyDefault;

function getDefaultEngineId(cb) {
    chrome.storage.sync.get([key], result => {
        cb(result[key] || '');
    })
}

function notifyChange() {
    chrome.runtime.sendMessage({
        notify: 'default engine set'
    })
}

function setDefaultEngineId(id) {
    chrome.storage.sync.set({[key]: id}, () => {
        notifyChange();
    })
}

export {getDefaultEngineId, setDefaultEngineId}
