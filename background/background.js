import categories from '../categories.js';
import {setVisible, removeEngine, removeCategory, saveEngine, saveCategory} from './update.js';
import {getEngineById, getCategoryById} from './fetch.js';

const config = {
    searchPage: "search/search.html",
    dark: false,
};

const data = {
    selectedTerm: "",
    categories: []
}

// function getCategories() {
//     data.categories = categories;
// }

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
            case 'setSearchTerm':
                data.selectedTerm = request.term;
                sendResponse({});
                break;
            case 'toggleDarkMode':
                config.dark = !config.dark;
                sendResponse({dark: config.dark});
                break;
            case 'getCategories':
                sendResponse({categories: data.categories});
                break;
            case 'setVisible':
                setVisible(request.id, request.value, data);
                sendResponse({msg: 'ok'});
                break;
            case 'removeEngine':
                removeEngine(request.id, data);
                sendResponse({msg: 'ok'});
                break;
            case 'removeCategory':
                const msg = removeCategory(request.id, data) ? 'ok' : 'error';
                sendResponse({msg});
                break;
            case 'getEngineById':
                getEngineById(request.id, data, (engine, category, categories) => {
                    sendResponse({engine, category, categories});
                });
                break;
            case 'getCategoryById':
                getCategoryById(request.id, data, category => {
                    sendResponse({category});
                });
                break;
            case 'saveEngine':
                saveEngine(request.id, request.name, request.url, request.categoryId, data);
                sendResponse({msg: 'ok'});
                break;
            case "saveCategory":
                saveCategory(request.id, request.name, data);
                sendResponse({msg: 'ok'});
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

function init() {
    data.categories = categories;
    // initBackground();
}

init();
