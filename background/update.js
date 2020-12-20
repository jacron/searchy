import {getCategoryById} from "./fetch.js";

function setVisible(engineId, value, data) {
    data.categories.map(category => {
        category.engines
            .filter(engine => engine.id === +engineId)
            .map(engine => {
                engine.visible = value
            })
    })
}

function removeEngine(id, data) {
    data.categories.map(category => {
        category.engines = category.engines
            .filter(engine => engine.id !== +id)
    })
}

function removeCategory(id, data) {
    const category = getCategoryById(id, data);
    if (category.engines.length > 0) {
        return false;
    } else {
        data.categories = data.categories
            .filter(category => category.id !== +id)
        return true;
    }
}

function copyEngineToCategory(engine, categoryId, data) {
    data.categories
        .filter(category => category.id === +categoryId)
        .map(category => {
            category.engines.push(engine);
    })
}

function getNewEngineId(data) {
    let max = 0;
    data.categories.map(category => {
        category.engines.map(engine => {
            if (engine.id > max) {
                max = engine.id;
            }
        })
    })
    return max + 1;
}

function getNewCategoryId(data) {
    let max = 0;
    data.categories.map(category => {
        if (category.id > max) {
            max = category.id;
        }
    })
    return max + 1;
}

function addEngine(name, url, categoryId, data) {
    data.categories
        .filter(category => category.id === +categoryId)
        .map(category => {
            category.engines.push({
                name,
                url,
                visible: true,
                id: getNewEngineId(data)
            })
        })
}

function updateEngine(engineId, name, url, categoryId, data) {
    data.categories.map(category => {
        const engines = category.engines
            .filter(engine => engine.id === +engineId);
        if (engines.length > 0) {
            const engine = engines[0];
            engine.name = name;
            engine.url = url;
            if (category.id !== +categoryId) {
                copyEngineToCategory(engine, categoryId, data);
                category.engines = category.engines.filter(eng => eng.id !== engine.id);
            }
        }
    })
}

function saveEngine(engineId, name, url, categoryId, data) {
    // console.log({engineId});
    if (engineId === '-1') {
        addEngine(name, url, categoryId, data);
    } else {
        updateEngine(engineId, name, url, categoryId, data);
    }
}

function addCategory(name, data) {
    data.categories.push({
        name,
        engines: [],
        id: getNewCategoryId(data)
    })
}

function updateCategory(categoryId, name, data) {
    data.categories
        .filter(category => category.id === +categoryId)
        .map(category => {
            category.name = name;
        })
}

function saveCategory(categoryId, name, data) {
    if (categoryId === '-1') {
        addCategory(name, data);
    } else {
        updateCategory(categoryId, name, data);
    }
}

export {setVisible, removeEngine, removeCategory, saveEngine, saveCategory}
