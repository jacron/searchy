import categories from '../categories.js';

const config = {
    searchPage: "search/search.html",
    dark: false,
};

const data = {
    selectedTerm: "",
    categories: []
}

function getCategories() {
    data.categories = categories;
}

chrome.contextMenus.create(
    {
        title: `Searchy "%s"`,
        contexts:["selection"],
        onclick: info => {
            data.selectedTerm = info.selectionText;
            chrome.tabs.create({
                url: config.searchPage
            });
        }});

chrome.runtime.onMessage.addListener(
    (request, sender, sendResponse) => {
        switch (request.cmd) {
            case 'getDarkMode':
                sendResponse({dark: config.dark});
                break;
            case 'getSelectedTerm':
                sendResponse({term: data.selectedTerm});
                break;
            case 'toggleDarkMode':
                config.dark = !config.dark;
                sendResponse({dark: config.dark});
                break;
            case 'getCategories':
                getCategories();
                sendResponse({categories: data.categories});
                break;
        }
})

function btnClicked() {
    chrome.tabs.query({
        active: true,
        lastFocusedWindow: true
    }, function(tabs) {
        const tab = tabs[0];
        chrome.tabs.update(tab.id, {
            url: config.searchPage,
        });
    });
}

chrome.browserAction.onClicked.addListener(btnClicked);
