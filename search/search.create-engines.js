import {getDefaultEngineId} from "../storage/default.js";
import {getCategories} from "../common/fetch.js";

function faviconUrlFromEngineUrl(url) {
    const p = url.split('/');
    const host = p[0] + '//' + p[2]; // p[1] is empty
    return host + '/favicon.ico';
}

function engineHtml(engine, nameClass) {
    const faviconUrl = faviconUrlFromEngineUrl(engine.url);
    return `
<div class="engine">
    <img src="${faviconUrl}" class="icon" alt="i">
    <a data-href="${engine.url}" data-id="${engine.id}"
        class="${nameClass}">${engine.name}</a>
</div>
`
}

function headerHtml(category) {
    return `<div class="category-title"
            title="Open all engines of '${category.name}'">
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

// dummy declarations
let category = {};
category.backgroundcolordark = undefined;
category.backgroundcolorlight = undefined;

function setCategoryColor(category, categoryDiv) {
    let backgroundColor = null;
    if (document.body.classList.contains('dark')) {
        if (category.backgroundcolordark) {
            backgroundColor = category.backgroundcolordark;
        }
    } else {
        if (category.backgroundcolorlight) {
            backgroundColor = category.backgroundcolorlight;
        }
    }
    if (backgroundColor) {
        categoryDiv.style.backgroundColor = backgroundColor;
        categoryDiv.setAttribute('bg', backgroundColor);
    }
}

function displayEngines(categories) {
    getDefaultEngineId(defaultEngineId => {
        const elementEngines = document.getElementById('engines');
        elementEngines.innerHTML = '';
        if (categories) {
            categories
                .filter(category => category.visible)
                .map(category => {
                    const categoryDiv = document.createElement('div');
                    categoryDiv.className = 'item';
                    categoryDiv.setAttribute('data-id', category.id);
                    setCategoryColor(category, categoryDiv);
                    categoryDiv.innerHTML = createCategoryEnginesHtml(category, defaultEngineId);
                    elementEngines.appendChild(categoryDiv);
            })
        }
    });
}

function setCategoryColors() {
    const elementEngines = document.getElementById('engines');
    if (elementEngines) {
        getCategories()
            .then(categories => displayEngines(categories));
    }
}

export {displayEngines, setCategoryColors}
