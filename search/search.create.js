import {getDefaultEngineId} from "../storage/default.js";

const chromeFaviconUrl = 'chrome://favicon/';

function createCategoryEnginesHtml(category, defaultEngineId) {
    let html = `<div class="category-title">${category.name}</div>`;
    category.engines
        .filter(engine => engine.visible)
        .map(engine => {
            const nameClass = engine.id === +defaultEngineId ? 'default' : '';
            html += `
<div class="engine">
    <img src="${chromeFaviconUrl}${engine.url}" class="icon" alt="i">
    <a href="${engine.url}" class="${nameClass}">${engine.name}</a>
</div>
`;
        })
    return html;
}

function displayEngines(categories) {
    getDefaultEngineId(defaultEngineId => {
        const elementEngines = document.getElementById('engines');
        elementEngines.innerHTML = '';
        categories.map(category => {
            const categoryDiv = document.createElement('div');
            categoryDiv.className = 'item';
            categoryDiv.innerHTML = createCategoryEnginesHtml(category, defaultEngineId);
            elementEngines.appendChild(categoryDiv);
        })
    });
}

export {displayEngines}
