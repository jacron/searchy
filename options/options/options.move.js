import {getCategories, getEngineCategory} from "../../common/fetch.js";
import {setCategories} from "../../common/update.js";

function getIndexById(categories, value) {
    for (let i = 0; i < categories.length; i++) {
        if (categories[i].id === value) {
            return i;
        }
    }
    return -1;
}

function getLastIndexById(categories, value) {
    for (let i = categories.length - 1; i > -1; i--) {
        if (categories[i].id === value) {
            return i;
        }
    }
    return -1;
}

function moveCategory(sourceId, targetId) {
    getCategories().then(categories => {
        const targetIndex = getIndexById(categories, +targetId);
        const sourceIndex = getIndexById(categories, +sourceId);
        const sourceCategory = categories.find(category => category.id === +sourceId);

        // insert
        categories.splice(targetIndex, 0, sourceCategory);

        // remove
        const indexForRemoval = targetIndex > sourceIndex ? sourceIndex :
            getLastIndexById(categories, +sourceId);
        categories.splice(indexForRemoval, 1);

        setCategories(categories);
    })
}

function moveEngine(sourceId, targetId) {
    getCategories().then(categories => {
        // put engine in new position in same or other category
        const sourceCategory = getEngineCategory(categories, sourceId);
        const targetCategory = getEngineCategory(categories, targetId);
        const sourceIndex = getIndexById(sourceCategory.engines, +sourceId);
        const targetIndex = getIndexById(targetCategory.engines, +targetId);
        const sourceEngine = sourceCategory.engines.find(engine => engine.id === +sourceId);

        // insert
        targetCategory.engines.splice(targetIndex, 0, sourceEngine);

        //remove
        let indexForRemoval = sourceIndex;
        if (sourceCategory === targetCategory && targetIndex < sourceIndex) {
            indexForRemoval = getLastIndexById(sourceCategory.engines, +sourceId);
        }
        sourceCategory.engines.splice(indexForRemoval, 1);

        setCategories(categories);
    })
}

export {moveCategory, moveEngine}
