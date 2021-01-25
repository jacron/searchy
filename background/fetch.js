function getEngineById(engineId, categories, cb) {
    categories.map(category => {
        const engine = category.engines
            .filter(engine => engine.id === +engineId);
        if (engine.length > 0) {
            cb(engine[0], category, categories);
        }
    })
}

function getCategoryById(categoryId) {
    return new Promise((resolve) => {
        getCategories().then(categories => {
            resolve(categories.find(category => category.id === +categoryId));
        })
    })
}

function getCategories() {
    return new Promise((resolve) => {
        chrome.storage.local.get('categories', res => resolve(res.categories))
    });
}

export {getEngineById, getCategoryById, getCategories}
