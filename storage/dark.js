import config from '../common/config.js';
import {setTypeaheadSearchColors} from "../search/search.typeaheadSearch.js";
import {setCategoryColors} from "../search/search.create-engines.js";
import {setTypeaheadEngineColors} from "../search/search.typeaheadEngine.js";

function isDarkMode() {
    return document.body.classList.contains('dark');
}

function toggleDarkmode() {
    const key = config.storageKeyDarkmode;
    chrome.storage.local.get([key], result => {
        const newValue = !result[key];
        chrome.storage.local.set({[key]: newValue}, () => {
            document.body.className = newValue ? 'dark' : '';
            setCategoryColors(newValue);
            setTypeaheadSearchColors();
            setTypeaheadEngineColors();
        })
    })
}

function initDarkmode(cb) {
    const key = config.storageKeyDarkmode;
    chrome.storage.local.get([key], result => {
        document.body.className = result[key] ? 'dark' : '';
        if (cb) {
            cb();
        }
    })
}

export {initDarkmode, toggleDarkmode, isDarkMode}
