function getEngineById(engineId, categories, cb) {
    categories.map(category => {
        const engine = category.engines
            .filter(engine => engine.id === +engineId);
        if (engine.length > 0) {
            cb(engine[0], category, categories);
        }
    })
}

function getCategoryById(categoryId, categories, cb) {
    const category = categories.filter(category => category.id === +categoryId);
    if (category.length > 0) {
        if (cb) {
            cb(category[0]);
        }
    }
    return category[0];
}

function getCategories() {
    return new Promise((resolve) => {
        chrome.storage.local.get('categories', res => resolve(res.categories))
    });
}

export {getEngineById, getCategoryById, getCategories}
