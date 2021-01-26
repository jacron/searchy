import {getDelim} from "../common/stringutils.js";
import {getCategories} from "../common/fetch.js";

const formAdd = {
    inputName: document.getElementById('inputName'),
    inputUrl: document.getElementById('inputUrl'),
    selectCategory: document.getElementById('selectCategory'),
    cmdSave: document.getElementById('btnSave'),
}

function initTitleTrim(title) {
    const delim = getDelim(title);
    const trimButtons = ['trim-title-1', 'trim-title-2', 'trim-title-1-2'];
    for (const tr of trimButtons) {
        document.getElementById(tr)
            .style.visibility = delim ? 'visible' : 'hidden';
    }
}

function stripQueryValue(url) {
    ['?q=', '&q=', '?query=', '?search=',
        '?zoek=', '?s=']
        .map(queryKey => {
            const pos = url.indexOf(queryKey);
            if (pos !== -1) {
                url = url.substr(0, pos + queryKey.length) + '%s';
            }
        })
    return url;
}

function populateOptions() {
    formAdd.selectCategory.innerHTML = '';
    getCategories().then(categories => {
        categories.map(category => {
            const option = document.createElement('option');
            option.value = category.id;
            option.label = category.name;
            formAdd.selectCategory.appendChild(option);
        });
    })
}

function populateDialogAdd(currentTab) {
    formAdd.inputName.value = currentTab.title;
    formAdd.inputUrl.value = stripQueryValue(currentTab.url);
    initTitleTrim(currentTab.title);
}

function populateDialog(currentTab) {
    populateDialogAdd(currentTab);
    populateOptions();
}

export {populateDialog}
