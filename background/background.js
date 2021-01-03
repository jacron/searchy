import {doAction} from './action.js';
import {getDataFromStorage} from '../common/persist.js';
import {openDialog} from "./openDialogAddEngine.js";

const config2 = {
    searchPage: "search/search.html",
};

const data = {
    selectedTerm: "",
    categories: [],
    defaultEngine: -1,
    // currentPageInfo: ""
    currentTab: null
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

function openDialogNewEngine() {
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function(tabs) {
        const currentTab = tabs.length > 0 ? tabs[0] : null;
        data.currentTab = currentTab;
        chrome.windows.get(currentTab.windowId, win => {
            openDialog(win);
        });
    });
}

chrome.contextMenus.create(
    {
        title: `Searchy: add this page to engines`,
        contexts:["page"],
        documentUrlPatterns: [
            "https://*/*",
            "http://*/*"
        ],
        onclick: () => {
            openDialogNewEngine();
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
    getDataFromStorage(categories => {
        data.categories = categories
    });
}

init();
