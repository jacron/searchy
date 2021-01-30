import {getCategories} from "../../common/fetch.js";
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
        let sourceIndex = getIndexById(categories, +sourceId);
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

export {moveCategory}
