import {getCategories, getCategoryById} from "./fetch.js";
// import {categories} from "../initial_data old";
// import {persistData} from '../common/persist.js';

function setVisible(engineId, value, categories) {
    // console.log(engineId, value, categories);
    categories.map(category => {
        category.engines
            .filter(engine => engine.id === +engineId)
            .map(engine => {
                engine.visible = value
            })
    })
    chrome.storage.local.set({categories});
    // persistData(data);
}

function removeEngine(enigineId) {
    return new Promise((resolve) => {
        getCategories().then(categories => {
            categories.map(category => {
                category.engines = category.engines
                    .filter(engine => engine.id !== +enigineId)
                // persistData(data);
            })
            chrome.storage.local.set({categories});
            resolve();
        })
    })
}

function removeEmptyCategory(categoryId, categories) {
    categories = categories.filter(category => category.id !== +categoryId);
    chrome.storage.local.set({categories});
    // persistData(data);
}

function removeCategoryWithEngines(categoryId, engines, categories) {
    engines.map(engine => {
        engines = engines.filter(engine2 => engine.id !== engine2.id)
    });
    categories = categories.filter(category => category.id !== +categoryId);
    chrome.storage.local.set({categories});
    // persistData(data);
}

function removeCategory(id, forced, data) {
    // const category =
    getCategoryById(id).then(category => {
        if (category.engines.length > 0) {
            if (forced) {
                removeCategoryWithEngines(id, category.engines, data);
                return true;
            } else {
                return false;
            }
        } else {
            removeEmptyCategory(id, data);
            return true;
        }
    });
}

function copyEngineToCategory(engine, categoryId, categories) {
    categories
        .filter(category => category.id === +categoryId)
        .map(category => {
            category.engines.push(engine);
    })
}

function getNewEngineId(categories) {
    let max = 0;
    categories.map(category => {
        category.engines.map(engine => {
            if (engine.id > max) {
                max = engine.id;
            }
        })
    })
    return max + 1;
}

function getNewCategoryId(categories) {
    let max = 0;
    categories.map(category => {
        if (category.id > max) {
            max = category.id;
        }
    })
    return max + 1;
}

function addEngine(name, url, categoryId, categories) {
    categories
        .filter(category => category.id === +categoryId)
        .map(category => {
            category.engines.push({
                name,
                url,
                visible: true,
                id: getNewEngineId(categories)
            })
            chrome.storage.local.set({categories});
            // persistData(data);
        })
}

function updateEngine(engineId, name, url, categoryId, categories) {
    categories.map(category => {
        const engines = category.engines
            .filter(engine => engine.id === +engineId);
        if (engines.length > 0) {
            const engine = engines[0];
            engine.name = name;
            engine.url = url;
            if (category.id !== +categoryId) {
                // add engine to new category
                copyEngineToCategory(engine, categoryId, categories);
                // remove engine from old category
                category.engines = category.engines.filter(eng => eng.id !== engine.id);
            }
            chrome.storage.local.set({categories});
            // persistData(data);
        }
    })
}

function updateCategory(categoryId, name, categories) {
    categories
        .filter(category => category.id === +categoryId)
        .map(category => {
            category.name = name;
        })
    chrome.storage.local.set({categories});
    // persistData(data);
}

function storeEngine(engineId, name, url, categoryId) {
    return new Promise((resolve) => {
        getCategories().then(categories => {
            if (engineId === '-1') {
                addEngine(name, url, categoryId, categories);
                resolve('added');
            } else {
                updateEngine(engineId, name, url, categoryId, categories);
                resolve('updated');
            }
        })
    });
}

function saveEngine(engineId, name, url, categoryId, categories) {
    if (engineId === '-1') {
        addEngine(name, url, categoryId, categories);
    } else {
        updateEngine(engineId, name, url, categoryId, categories);
    }
}

function addCategory(name, id, engines, categories) {
    categories.push({
        name,
        engines,
        id
    });
    chrome.storage.local.set({categories});
    // persistData(data);
}

function storeCategory(categoryId, name) {
    return new Promise((resolve) => {
        getCategories().then(categories => {
            if (categoryId === '-1') {
                const newId = getNewCategoryId(categories);
                addCategory(name, newId, [], categories);
                resolve(newId);
            } else {
                updateCategory(categoryId, name, categories);
                resolve(null);
            }
        })
    });
}

function saveCategory(categoryId, name, categories, cb) {
    if (categoryId === '-1') {
        const newId = getNewCategoryId(categories);
        addCategory(name, newId, [], categories);
        if (cb) {
            cb(newId);
        }
    } else {
        updateCategory(categoryId, name, categories);
    }
}

function addImportedCategory(category, name, categories) {
    const newId = getNewCategoryId(categories);
    addCategory(name, newId, category.engines, categories);
}

export {setVisible, removeEngine, removeCategory,
    storeCategory, storeEngine,
    saveEngine, saveCategory, addImportedCategory}
