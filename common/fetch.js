function getEngineById(engineId) {
    return new Promise((resolve) => {
        getCategories().then(categories => {
            categories.map(category => {
                const engine = category.engines
                    .find(engine => engine.id === +engineId);
                if (engine) {
                    resolve([engine, category]);
                }
            })
        })
    })

}

function getCategoryById(categoryId) {
    return new Promise((resolve) => {
        getCategories().then(categories => {
            resolve(categories.find(category => category.id === +categoryId));
        })
    })
}

function getEngineCategory(categories, engineId) {
    for (let category of categories) {
        for (let engine of category.engines) {
            if (engine.id === +engineId) {
                return category;
            }
        }
    }
    return -1;
}

function getCategories() {
    return new Promise((resolve) => {
        chrome.storage.sync.get('categories', res => resolve(res.categories))
    });
}

export {getEngineById, getCategoryById, getCategories, getEngineCategory}
