import {
    addImportedCategory, removeCategory, saveCategory,
    saveEngine, setVisible
} from "./update.js";
import {getEngineById} from "./fetch.js";

function fromStorageSend(sendResponse, storageKey, responseKey) {
    if (!responseKey) {
        responseKey = storageKey;
    }
    chrome.storage.local.get([storageKey],
        data => {
            sendResponse({
                [responseKey]: data[storageKey]
            });
        });
}

function doAction(request, sendResponse) {
    switch (request.cmd) {
        case 'getCurrentTab':
            fromStorageSend(sendResponse, 'currentTab');
            break;
        case 'getSelectedTerm':
            fromStorageSend(sendResponse, 'selectedTerm');
            break;
        case 'setSearchTerm':
            chrome.storage.local.set({
                selectedTerm: request.term
            });
            sendResponse({msg: 'ok'});
            break;
        case 'getCategories':
            fromStorageSend(sendResponse, 'categories');
            break;
        case 'setCategories':
            chrome.local.storage.set({
                categories: request.categories
            });
            sendResponse({msg: 'ok'});
            break;
        case 'getEngineById':
            chrome.storage.local.get(['categories'], res => {
                getEngineById(request.id, res.categories, (engine, category, categories) => {
                    sendResponse({engine, category, categories});
                });
            })
            break;
        // case 'getCategoryById':
        //     chrome.storage.local.get(['categories'], res => {
        //         getCategoryById(request.id, res.categories, category => {
        //             sendResponse({category});
        //         });
        //     })
        //     break;

        //    CRUD
        case 'addCategory':
            chrome.storage.local.get(['categories'], res => {
                addImportedCategory(request.category, request.name, res.categories);
                // sendResponse(data);//??
                sendResponse({msg: 'ok'});
            })
            break;
        case 'setVisible':
            chrome.storage.local.get(['categories'], res => {
                setVisible(request.id, request.value, res.categories);
                sendResponse({msg: 'ok'});
            })
            break;
        // case 'removeTheEngine':
        //     chrome.storage.local.get(['categories'], res => {
        //         removeTheEngine(request.id, res.categories);
        //         sendResponse({msg: 'ok'});
        //     })
        //     break;
        case 'removeCategory':
            chrome.storage.local.get(['categories'], res => {
                const msg = removeCategory(request.id, request.forced, res.categories) ?
                    'ok' : 'category not empty';
                sendResponse({msg});
            })
            break;
        case 'saveEngine':
            chrome.storage.local.get(['categories'], res => {
                saveEngine(request.id, request.name, request.url, request.categoryId, res.categories);
                sendResponse({msg: 'ok'});
            })
            break;
        case "saveCategory":
            chrome.storage.local.get(['categories'], res => {
                saveCategory(request.id, request.name, res.categories, newId => {
                    sendResponse({msg: 'ok', newId});
                });
            })
            break;
    }
}

export {doAction}
