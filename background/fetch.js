function getEngineById(engineId, data, cb) {
    data.categories.map(category => {
        const engine = category.engines
            .filter(engine => engine.id === +engineId);
        if (engine.length > 0) {
            cb(engine[0], category, data.categories);
        }
    })
}

export {getEngineById}
