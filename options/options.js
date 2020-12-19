const chromeFaviconUrl = 'chrome://favicon/';

function createCategoryEnginesHtml(category) {
    let html = `<div class="category-title">${category.name}</div>`;
    category.engines.map(engine => {
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
    categories.map(category => {
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'item';
        categoryDiv.innerHTML = createCategoryEnginesHtml(category);
        document.getElementById('engines').appendChild(categoryDiv);
    })
}

function showEngineLinks() {
    chrome.runtime.sendMessage({cmd: "getCategories"},
        response => displayEngines(response.categories))
}

function setDark(dark) {
    document.body.className = dark ? 'dark' : '';
}

function darkMode() {
    chrome.runtime.sendMessage({cmd: "getDarkMode"},
        response => setDark(response.dark))
}

function toggleDarkModeEvent() {
    document.getElementById('toggleDark').addEventListener('click', () => {
        chrome.runtime.sendMessage({cmd: 'toggleDarkMode'},
            response => setDark(response.dark))
    })
}

function init() {
    darkMode();
    showEngineLinks();
    toggleDarkModeEvent();
}

init();
