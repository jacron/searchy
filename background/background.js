import {doAction} from './action.js';
import {getDataFromStorage} from '../common/persist.js';

const config2 = {
    searchPage: "search/search.html",
};

const data = {
    selectedTerm: "",
    categories: []
}

chrome.contextMenus.create(
    {
        title: `Searchy "%s"`,
        contexts:["selection"],
        onclick: info => {
            data.selectedTerm = info.selectionText;
            chrome.tabs.create({
                url: config2.searchPage
            });
        }});

chrome.contextMenus.create(
    {
        title: `Searchy add engine`,
        contexts:["page"],
        documentUrlPatterns: [
            "https://*/*",
            "http://*/*"
        ],
        onclick: info => {
            console.log({info});
        }});

chrome.runtime.onMessage.addListener(
    (request, sender, sendResponse) => {
        doAction(request, sendResponse, data);
})

function btnClicked() {
    chrome.tabs.query({
        active: true,
        lastFocusedWindow: true
    }, function(tabs) {
        const tab = tabs[0];
        chrome.tabs.update(tab.id, {
            url: config2.searchPage,
        });
    });
}

chrome.browserAction.onClicked.addListener(btnClicked);

function init() {
    getDataFromStorage(categories => data.categories = categories);
}

init();
