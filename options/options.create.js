function createEngineHtml(engine) {
    return `
<div class="engine" data-id="${engine.id}">
    <span class="visible">
        <input type="checkbox" title="visible on/off"
        class="check-visible" ${engine.visible ? 'checked' : ''}>
    </span>
    <span class="name">${engine.name}</span>
    <span class="controls">
        <span>&nbsp;</span>
        <span class="fa fa-edit" title="edit"></span>    
        <span class="fa fa-delete" title="delete"></span>
    </span>
</div>
`;
}

function createCategoryEnginesHtml(category) {
    let html = `<div class="category-title">${category.name}</div>`;
    category.engines
        .map(engine => {
            html += createEngineHtml(engine)
        })
    return html;
}

function createCategoryHtml(category) {
    return `
<div class="category" data-id="${category.id}">
    <span class="name">${category.name}</span>
    <span class="controls">
        <span>&nbsp;</span>
        <span class="fa fa-edit" title="edit"></span>    
        <span class="fa fa-delete" title="delete"></span>
    </span>
</div>
`;
}

function createCategoryDiv(category) {
    const categoryDiv = document.createElement('div');
    categoryDiv.className = 'item';
    categoryDiv.innerHTML = createCategoryEnginesHtml(category);
    return categoryDiv;
}

function createCatDiv(category) {
    const catDiv = document.createElement('div');
    catDiv.className = 'category';
    catDiv.innerHTML = createCategoryHtml(category);
    return catDiv;
}

function displayEngines(categories) {
    const elementEngines = document.getElementById('engines');
    const elementCategories = document.getElementById('categories');
    elementEngines.innerHTML = '';
    elementCategories.innerHTML = '';
    categories.map(category => {
        elementEngines.appendChild(createCategoryDiv(category));
        elementCategories.appendChild(createCatDiv(category));
    })
}

function showEngineLinks() {
    chrome.runtime.sendMessage({cmd: "getCategories"},
        response => displayEngines(response.categories))
}

export {showEngineLinks}