import {getDefaultEngineId} from "../storage/default.js";

const chromeFaviconUrl = 'chrome://favicon/';

function engineHtml(engine, nameClass) {
    return `
<div class="engine">
    <img src="${chromeFaviconUrl}${engine.url}" class="icon" alt="i">
    <a data-href="${engine.url}" data-id="${engine.id}"
        class="${nameClass}">${engine.name}</a>
</div>
`
}

function headerHtml(category) {
    return `<div class="category-title" title="Open all engines of '${category.name}'">
    ${category.name}
</div>`
}

function createCategoryEnginesHtml(category, defaultEngineId) {
    let html = headerHtml(category);
    category.engines
        .filter(engine => engine.visible)
        .map(engine => {
            const nameClass = engine.id === +defaultEngineId ? 'default' : '';
            html += engineHtml(engine, nameClass);
        })
    return html;
}

function displayEngines(categories) {
    getDefaultEngineId(defaultEngineId => {
        const elementEngines = document.getElementById('engines');
        elementEngines.innerHTML = '';
        if (categories) {
            categories.map(category => {
                const categoryDiv = document.createElement('div');
                categoryDiv.className = 'item';
                categoryDiv.innerHTML = createCategoryEnginesHtml(category, defaultEngineId);
                elementEngines.appendChild(categoryDiv);
            })
        }
    });
}

export {displayEngines}
