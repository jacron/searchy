import {removeCategory, removeEngine, saveCategory,
    saveEngine, setVisible} from "./update.js";
import {getCategoryById, getEngineById} from "./fetch.js";

function doAction(request, sendResponse, data) {
    switch (request.cmd) {
        case 'getSelectedTerm':
            sendResponse({term: data.selectedTerm});
            break;
        case 'setSearchTerm':
            data.selectedTerm = request.term;
            sendResponse({msg: 'ok'});
            break;
        case 'getCategories':
            sendResponse({categories: data.categories});
            break;
        case 'setCategories':
            data.categories = request.categories;
            sendResponse({msg: 'ok'});
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

        //    CRUD
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
        case 'saveEngine':
            saveEngine(request.id, request.name, request.url, request.categoryId, data);
            sendResponse({msg: 'ok'});
            break;
        case "saveCategory":
            saveCategory(request.id, request.name, data, newId => {
                sendResponse({msg: 'ok', newId});
            });
            break;
    }
}

export {doAction}
