import {getCategoriesFromStorage} from '../common/persist.js';
import {openDialog} from "./openDialogAddEngine.js";
import {setCategories} from "../common/update.js";

const config2 = {
    searchPage: "search/search.html",
};

chrome.contextMenus.create(
    {
        title: `Searchy "%s"`,
        contexts:["selection"],
        onclick: info => {
            chrome.storage.local.set({
                selectedTerm: info.selectionText
            })
            // data.selectedTerm = info.selectionText;
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
        // data.currentTab = currentTab;
        chrome.storage.local.set({currentTab})
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

function searchInCurrentTab() {
    let url = config2.searchPage;
    chrome.tabs.query({
        active: true,
        lastFocusedWindow: true
    }, function(tabs) {
        const tab = tabs[0];
        chrome.tabs.update(tab.id, {url});
    });
}

function setSearchTerm(selectedTerm) {
    // data.selectedTerm = term;
    chrome.storage.local.set({selectedTerm});
}

function handleOmniboxInputEntered(q) {
    setSearchTerm(q);
    searchInCurrentTab();
}

function handleActionClicked() {
    searchInCurrentTab();
}

chrome.browserAction.onClicked.addListener(handleActionClicked);
chrome.omnibox.onInputEntered.addListener(handleOmniboxInputEntered);

function init() {
    // one time upgrade from local to sync
    // chrome.storage.local.get('categories', res => setCategories(res.categories));

    getCategoriesFromStorage();
}

init();
