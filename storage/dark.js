import config from '../common/config.js';

const key = config.storageKeyDarkmode;

function toggleDarkmode(dark) {
    chrome.storage.local.get([key], result => {
        const newValue = !result[key];
        chrome.storage.local.set({[key]: newValue}, () => {
            document.body.className = newValue ? 'dark' : '';
        })
    })
}

function initDarkmode() {
    chrome.storage.local.get([key], result => {
        document.body.className = result[key] ? 'dark' : '';
    })
}

export {initDarkmode, toggleDarkmode}
