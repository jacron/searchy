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

function getCategories() {
    return new Promise((resolve) => {
        chrome.storage.local.get('categories', res => resolve(res.categories))
    });
}

export {getEngineById, getCategoryById, getCategories}
