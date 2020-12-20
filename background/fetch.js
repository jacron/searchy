function getEngineById(engineId, data, cb) {
    data.categories.map(category => {
        const engine = category.engines
            .filter(engine => engine.id === +engineId);
        if (engine.length > 0) {
            cb(engine[0], category, data.categories);
        }
    })
}

function getCategoryById(categoryId, data, cb) {
    const category = data.categories.filter(category => category.id === +categoryId);
    if (category.length > 0) {
        if (cb) {
            cb(category[0]);
        }
    }
    return category[0];
}

export {getEngineById, getCategoryById}
