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

function faviconUrlFromEngineUrl(url) {
    const p = url.split('/');
    const host = p[0] + '//' + p[2]; // p[1] is empty
    return host + '/favicon.ico';
}

export {setCategoryColor, faviconUrlFromEngineUrl}
