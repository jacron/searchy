import {getDefaultEngineId} from "../../storage/default.js";
import {getTerms} from "../../search/search.term.js";

function categoryHtml(category) {
    return `
<div class="category" data-id="${category.id}">
    <span class="category-title name">${category.name}</span>
    <span class="controls">
        <span>&nbsp;</span>
        <span class="fa fa-edit edit cat" title="edit"></span>    
        <span class="fa fa-delete delete cat" title="delete"></span>
        <span class="fa fa-plus add cat" title="add engine"></span>
        <span class="fa fa-floppy-o export-group cat" title="export group"></span>
    </span>
</div>
`
}

function engineHtml(engine, defaultEngineId) {
    const nameClass = engine.id === +defaultEngineId ? 'default' : '';
    return `
<div class="engine" data-id="${engine.id}" data-url="${engine.url}">
    <span class="visible">
        <input type="checkbox" title="visible on/off" 
        class="check-visible" ${engine.visible ? 'checked' : ''}>
    </span>
    <span class="name ${nameClass}">${engine.name}</span>
    <span class="controls">
        <span>&nbsp;</span>
        <span class="fa fa-edit edit eng" title="edit"></span>    
        <span class="fa fa-external-link link eng" title="link"></span>    
        <span class="fa fa-delete delete eng" title="delete"></span>
        <span class="fa fa-flag set-default eng" title="set default"></span>
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
        // console.log({categories});
        categories.map(category => {
            elementEngines.appendChild(createCategoryDiv(category, defaultEngineId));
        })
    })
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
    chrome.runtime.sendMessage({cmd: "getCategories"},
        response => {
            displayItems(response.categories);
        })
}

function reDisplayEngines(result) {
    if (result.msg && result.msg === 'changed') {
        showEngineLinks();
    }
}

function displayTerms() {
    const elementTerms = document.getElementById('history');
    elementTerms.innerHTML = '';
    const terms = getTerms();
    terms.forEach(term => {
        console.log(term);
    });
}

export {showEngineLinks, displayItems, reDisplayEngines, displayTerms}
