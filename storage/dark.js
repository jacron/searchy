import config from '../common/config.js';
import {setTypeaheadColors} from "../search/search.typeahead.js";

const key = config.storageKeyDarkmode;

function toggleDarkmode(dark) {
    chrome.storage.local.get([key], result => {
        const newValue = !result[key];
        chrome.storage.local.set({[key]: newValue}, () => {
            document.body.className = newValue ? 'dark' : '';
            setTypeaheadColors();
        })
    })
}

function initDarkmode(cb) {
    chrome.storage.local.get([key], result => {
        document.body.className = result[key] ? 'dark' : '';
        cb();
    })
}

export {initDarkmode, toggleDarkmode}
