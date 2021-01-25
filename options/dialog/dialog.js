import {showBackground} from "./dialog.background.js";
import {getCategories} from "../../common/fetch.js";
// import {categories} from "../../initial_data old";

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
    getCategories().then(categories => {
        categories.map(category => {
            const option = document.createElement('option');
            option.value = category.id;
            option.label = category.name;
            selectElement.appendChild(option);
        });
        selectElement.value = selectedCategoryId;
    })
}

export {showDialog, populateOptions}
