const chromeFaviconUrl = 'chrome://favicon/';

function createCategoryEnginesHtml(category) {
    let html = `<div class="category-title">${category.name}</div>`;
    category.engines
        .filter(engine => engine.visible)
        .map(engine => {
            html += `
<div class="engine">
    <img src="${chromeFaviconUrl}${engine.url}" class="icon" alt="i">
    <a href="${engine.url}">${engine.name}</a>
</div>
`;
        })
    return html;
}

function displayEngines(categories) {
    const elementEngines = document.getElementById('engines');
    elementEngines.innerHTML = '';
    categories.map(category => {
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'item';
        categoryDiv.innerHTML = createCategoryEnginesHtml(category);
        elementEngines.appendChild(categoryDiv);
    })
}

export {displayEngines}
