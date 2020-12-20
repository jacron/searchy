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
    data.categories = data.categories
        .filter(category => category.id !== +id)
}

function remove(type, id, data) {
    if (type === 'engine') {
        removeEngine(id, data);
    }
    if (type === 'category') {
        removeCategory(id, data);
    }
}

function copyEngineToCategory(engine, categoryId, data) {
    data.categories
        .filter(category => category.id === +categoryId)
        .map(category => {
            category.engines.push(engine);
    })
}

function saveEngine(engineId, name, url, categoryId, data) {
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

export {setVisible, remove, saveEngine}
