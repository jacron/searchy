import {getDefaultEngineId} from "../../storage/default.js";
import {getCategories} from "../../background/fetch.js";
import {categoryHtml, engineHtml} from "./options.templates.js";

function createCategoryEnginesHtml(category, defaultEngineId) {
    let html = categoryHtml(category);
    category.engines
        .map(engine => html += engineHtml(engine, defaultEngineId))
    return html;
}

function createCategoryDiv(category, defaultEngineId) {
    const categoryDiv = document.createElement('div');
    categoryDiv.className = 'item';
    categoryDiv.innerHTML = createCategoryEnginesHtml(category, defaultEngineId);
    return categoryDiv;
}

function createCategories(categories, defaultEngineId) {
    const elementEngines = document.getElementById('engines');
    elementEngines.innerHTML = '';
    categories.map(category => {
        elementEngines.appendChild(createCategoryDiv(category, defaultEngineId));
    })
}

function displayEngines(categories) {
    getDefaultEngineId(defaultEngineId => createCategories(categories, defaultEngineId));
}

function displayItems(categories, cb) {
    displayEngines(categories);
    // createCategories(categories);
    if (cb) {
        setTimeout(() => {
            cb();
        }, 100);
    }
}

function showEngineLinks() {
    // getCategories().then(categories => displayItems(categories));
    chrome.storage.local.get(['categories', 'default'], res => {
        createCategories(res.categories, res.default)
    })

}

function reDisplayEngines(result) {
    if (result.msg && result.msg === 'changed') {
        showEngineLinks();
    }
}

export {showEngineLinks, displayItems, reDisplayEngines}
