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

export {setVisible, remove}
