import {getNewtabSetting} from "../storage/newtab.js";

function fillPlaceholder(url, term) {
    const magic = '%s';
    if (url.indexOf(magic) !== -1) {
        return url.replace(magic, term);
    } else {
        return url + term;
    }
}

function toUrl(url, term) {
    getNewtabSetting().then(set => set ? newTab(url, term) : curTab(url, term))
}

function newTab(url, term) {
    chrome.tabs.create({
        url: fillPlaceholder(url, term)
    })
}

function curTab(url, term) {
    document.location.href = fillPlaceholder(url, term);
}

export {toUrl, newTab}
