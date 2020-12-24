import {getDefaultEngineId} from "../storage/default.js";

function categoryHtml(category) {
    return `
<div class="category" data-id="${category.id}">
    <span class="category-title name">${category.name}</span>
    <span class="controls">
        <span>&nbsp;</span>
        <span class="fa fa-edit cat" title="edit"></span>    
        <span class="fa fa-delete cat" title="delete"></span>
        <span class="fa fa-plus cat" title="add engine"></span>
    </span>
</div>
`
}

function engineHtml(engine, defaultEngineId) {
    const nameClass = engine.id === +defaultEngineId ? 'default' : '';
    return `
<div class="engine" data-id="${engine.id}">
    <span class="visible">
        <input type="checkbox" title="visible on/off" 
        class="check-visible" ${engine.visible ? 'checked' : ''}>
    </span>
    <span class="name ${nameClass}">${engine.name}</span>
    <span class="controls">
        <span>&nbsp;</span>
        <span class="fa fa-edit eng" title="edit"></span>    
        <span class="fa fa-delete eng" title="delete"></span>
        <span class="fa fa-flag eng" title="set default"></span>
    </span>
</div>
`;
}

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

function displayEngines(categories) {
    getDefaultEngineId(defaultEngineId => {
        const elementEngines = document.getElementById('engines');
        elementEngines.innerHTML = '';
        categories.map(category => {
            elementEngines.appendChild(createCategoryDiv(category, defaultEngineId));
        })
    })
}

function revealBottom() {
    document.getElementById('bottom')
        .style.display = 'block';
}

function displayItems(categories) {
    displayEngines(categories);
    revealBottom();
    // if (cb) {
    //     setTimeout(() => {
    //         cb();
    //     }, 100);
    // }
}

function showEngineLinks() {
    chrome.runtime.sendMessage({cmd: "getCategories"},
        response => {
            displayItems(response.categories);
        })
}

function reDisplay(result) {
    if (result.msg && result.msg === 'changed') {
        showEngineLinks();
    }
}

export {showEngineLinks, displayItems, reDisplay}
