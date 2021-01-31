import {getDefaultEngineId} from "../../storage/default.js";
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
    // categoryDiv.setAttribute('draggable', 'true');
    categoryDiv.setAttribute('data-id', category.id);
    categoryDiv.innerHTML = createCategoryEnginesHtml(category, defaultEngineId);
    return categoryDiv;
}

function createCategories(categories, defaultEngineId) {
    if (categories) {
        const elementEngines = document.getElementById('engines');
        elementEngines.innerHTML = '';
        categories.map(category => {
            elementEngines.appendChild(createCategoryDiv(category, defaultEngineId));
        })
    }
}

function displayEngines(categories) {
    getDefaultEngineId(defaultEngineId => createCategories(categories, defaultEngineId));
}

function displayItems(categories, cb) {
    displayEngines(categories);
    if (cb) {
        setTimeout(() => {
            cb();
        }, 100);
    }
}

function showEngineLinks() {
    chrome.storage.sync.get(['categories', 'default'], res => {
        createCategories(res.categories, res.default)
    })

}

function reDisplayEngines(result) {
    if (result.msg && result.msg === 'changed') {
        showEngineLinks();
    }
}

export {showEngineLinks, displayItems, reDisplayEngines}
