import {getDefaultEngineId} from "../../storage/default.js";
import {categoryHtml, engineHtml} from "./options.templates.js";
import {faviconUrlFromEngineUrl, setCategoryColor} from "../../common/color.js";
import config from "../../common/config.js";
import {enginesClick} from "../../search/search.events.js";
import {getCategories, setCategories} from "../../common/fetch.js";

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

function renderCategories(categories, defaultEngineId) {
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

function createCategories(categories, defaultEngineId) {
    if (categories) {
        renderCategories(categories, defaultEngineId)
    } else {
        if (confirm("No links found. Should I get some defaults?")) {
            chrome.runtime.sendMessage({request: 'getinitial'},
                (data) => {
                    if (data.data === 'is fetched') {
                        setTimeout(() => {
                            getCategories().then(categories => {
                                categories.map(category => category.visible = true);
                                setCategories(categories);
                                renderCategories(categories, defaultEngineId);
                            })
                        }, 1000);
                    }
                });
        }
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

/* default = default enigine id */
function showEngineLinks() {
    chrome.storage.sync.get(['categories', 'default'], res => {
        createCategories(res.categories, res.default)
    })
}

// chrome.storage.sync.remove('categories');

function reDisplayEngines(result) {
    if (result.msg && result.msg === 'changed') {
        showEngineLinks();
    }
}

export {showEngineLinks, displayItems, reDisplayEngines}
