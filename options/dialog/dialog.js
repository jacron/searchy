import {showBackground} from "./dialog.background.js";

function calcCenteredLeft(w) {
    return window.innerWidth / 2 - (w / 2);
}

function showDialog(dialog) {
    showBackground();
    dialog.style.display = 'block';
    const rect = dialog.getBoundingClientRect();
    dialog.style.top = '0px';
    dialog.style.left = calcCenteredLeft(rect.width) + 'px';
}

function populateOptions(selectElement, selectedCategoryId) {
    selectElement.innerHTML = '';
    chrome.storage.local.get(['categories'], response => {
        response.categories.map(category => {
            const option = document.createElement('option');
            option.value = category.id;
            option.label = category.name;
            selectElement.appendChild(option);
        });
        selectElement.value = selectedCategoryId;
    })
    // chrome.runtime.sendMessage({cmd: 'getCategories'}, response => {
    //     response.categories.map(category => {
    //         const option = document.createElement('option');
    //         option.value = category.id;
    //         option.label = category.name;
    //         selectElement.appendChild(option);
    //     });
    //     selectElement.value = selectedCategoryId;
    // })
}

export {showDialog, populateOptions}
