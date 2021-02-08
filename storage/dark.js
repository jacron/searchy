import config from '../common/config.js';
import {setTypeaheadColors} from "../search/search.typeahead.js";
import {setCategoryColors} from "../search/search.create-engines.js";

const key = config.storageKeyDarkmode;

function isDarkMode() {
    return document.body.classList.contains('dark');
}

function toggleDarkmode() {
    chrome.storage.local.get([key], result => {
        const newValue = !result[key];
        chrome.storage.local.set({[key]: newValue}, () => {
            document.body.className = newValue ? 'dark' : '';
            setTypeaheadColors();
            setCategoryColors(newValue);
        })
    })
}

function initDarkmode(cb) {
    chrome.storage.local.get([key], result => {
        document.body.className = result[key] ? 'dark' : '';
        if (cb) {
            cb();
        }
    })
}

export {initDarkmode, toggleDarkmode, isDarkMode}
