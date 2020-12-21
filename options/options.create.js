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
        <span class="fa fa-edit eng" title="edit"></span>    
        <span class="fa fa-delete eng" title="delete"></span>
    </span>
</div>
`;
}

function createCategoryEnginesHtml(category) {
    let html = `
<div class="category" data-id="${category.id}">
    <span class="category-title name">${category.name}</span>
    <span class="controls">
        <span>&nbsp;</span>
        <span class="fa fa-edit cat" title="edit"></span>    
        <span class="fa fa-delete cat" title="delete"></span>
        <span class="fa fa-plus cat" title="add engine"></span>
    </span>
</div>
`;
    category.engines
        .map(engine => {
            html += createEngineHtml(engine)
        })
    return html;
}

function createCategoryDiv(category) {
    const categoryDiv = document.createElement('div');
    categoryDiv.className = 'item';
    categoryDiv.innerHTML = createCategoryEnginesHtml(category);
    return categoryDiv;
}

function displayEngines(categories) {
    const elementEngines = document.getElementById('engines');
    elementEngines.innerHTML = '';
    categories.map(category => {
        elementEngines.appendChild(createCategoryDiv(category));
    })
}

function revealBottom() {
    document.getElementById('bottom')
        .style.display = 'block';
}

function displayItems(categories, cb) {
    displayEngines(categories);
    revealBottom();
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

export {showEngineLinks, displayItems}