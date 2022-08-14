import {getCategories, setCategories} from "./fetch.js";


function setVisible(id, value, className) {
    // console.log(className);
    getCategories().then(categories => {
        categories.map(category => {
            if (className === 'engine') {
                category.engines
                    .filter(engine => engine.id === +id)
                    .map(engine => engine.visible = value)
            }
            if (className === 'category') {
                if (category.id === +id) {
                    category.visible = value;
                }
            }
        })
        setCategories(categories);
    })
}

function removeEngine(enigineId) {
    return new Promise((resolve) => {
        getCategories().then(categories => {
            categories.map(category => {
                category.engines = category.engines
                    .filter(engine => engine.id !== +enigineId)
            })
            setCategories(categories);
            resolve();
        })
    })
}

function removeEmptyCategory(categoryId, categories) {
    categories = categories.filter(category => category.id !== +categoryId);
    setCategories(categories);
}

function removeCategoryWithEngines(categoryId, engines, categories) {
    engines.map(engine => {
        engines = engines.filter(engine2 => engine.id !== engine2.id)
    });
    categories = categories.filter(category => category.id !== +categoryId);
    setCategories(categories);
}

function removeCategory(id, forced) {
    return new Promise(resolve => {
        getCategories().then(categories => {
            const category = categories.find(category => category.id === +id);
            if (category.engines.length > 0) {
                if (forced) {
                    removeCategoryWithEngines(id, category.engines, categories);
                    resolve(true);
                } else {
                    resolve(false);
                }
            } else {
                removeEmptyCategory(id, categories);
                resolve(true);
            }
        })
    })
}

function copyEngineToCategory(engine, categoryId, categories) {
    categories
        .filter(category => category.id === +categoryId)
        .map(category => {
            category.engines.push(engine);
    })
}

function setCategoryProperty(categoryId, propertyName, value) {
    getCategories().then(categories => {
        const category = categories.find(category => category.id === +categoryId);
        category[propertyName] = value;
        setCategories(categories);
    });
}

function removeCategoryProperty(categoryId, propertyName) {
    getCategories().then(categories => {
        const category = categories.find(category => category.id === +categoryId);
        delete category[propertyName];
        setCategories(categories);
    });
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
            setCategories(categories);
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
            setCategories(categories);
        }
    })
}

function updateCategory(categoryId, name, categories) {
    categories
        .filter(category => category.id === +categoryId)
        .map(category => {
            category.name = name;
        })
    setCategories(categories);
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
    setCategories(categories);
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

export {setVisible, removeEngine, removeCategory, removeCategoryProperty,
    storeCategory, storeEngine, setCategoryProperty,
    saveEngine, saveCategory, addImportedCategory, setCategories}
