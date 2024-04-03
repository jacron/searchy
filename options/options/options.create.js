import {getDefaultEngineId} from "../../storage/default.js";
import {categoryHtml, engineHtml} from "./options.templates.js";
import {faviconUrlFromEngineUrl, setCategoryColor} from "../../common/color.js";
import config from "../../common/config.js";
import {enginesClick} from "../../search/search.events.js";

function createCategoryEnginesHtml(category, defaultEngineId, editable) {
    let html = categoryHtml(category);
    category.engines.forEach(engine => {
        if (engine.visible || editable) {
            const faviconUrl = faviconUrlFromEngineUrl(engine.url);
            html += engineHtml(engine, defaultEngineId, faviconUrl);
        }
    })
    return html;
}

function createCategoryDiv(category, defaultEngineId, editable) {
    const categoryDiv = document.createElement('div');
    categoryDiv.className = 'item';
    categoryDiv.setAttribute('data-id', category.id);
    categoryDiv.innerHTML = createCategoryEnginesHtml(category, defaultEngineId, editable);
    categoryDiv.addEventListener('click', enginesClick);
    setCategoryColor(category, categoryDiv);
    return categoryDiv;
}

function createCategories(categories, defaultEngineId) {
    if (categories) {
        const elementEngines = document.getElementById('engines');
        elementEngines.innerHTML = '';
        chrome.storage.local.get([config.storageKeyEditmode], results => {
            const editable = results[config.storageKeyEditmode];
            categories.map(category => {
                if (category.visible || editable) {
                    elementEngines.appendChild(
                        createCategoryDiv(category, defaultEngineId, editable));
                }
            })
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
