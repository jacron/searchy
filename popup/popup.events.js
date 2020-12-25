import {bindToElements} from "../common/bind-events.js";
import {getDelim, getHost, getTitleParts} from "../common/stringutils.js";
import {getCurrentTab} from "./popup.currenttab.js";

let currentTab;

const formAdd = {
    inputName: document.getElementById('inputName'),
    inputUrl: document.getElementById('inputUrl'),
    selectCategory: document.getElementById('selectCategory'),
    cmdSave: document.getElementById('btnSave'),
}

function openPage(url) {
    chrome.tabs.create({
        url
    }, () => {})
}

function searchPage() {
    openPage('../search/search.html');
}

function optionsPage() {
    openPage('../options/options.html');
}

function save() {
    chrome.runtime.sendMessage({
        cmd: 'saveEngine',
        id: '-1',
        name: formAdd.inputName.value,
        url: formAdd.inputUrl.value,
        categoryId: formAdd.selectCategory.value
    }, () => {
        window.close();
    });
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
                url = url.substr(0, pos + queryKey.length);
            }
        })
    return url;
}

function populateOptions(id) {
    formAdd.selectCategory.innerHTML = '';
    chrome.runtime.sendMessage({cmd: 'getCategories'}, response => {
        response.categories.map(category => {
            const option = document.createElement('option');
            option.value = category.id;
            option.label = category.name;
            formAdd.selectCategory.appendChild(option);
        });
        if (id) {
            formAdd.selectCategory.value = id;
        }
    })
}

function siteFromUrl(url) {
    const w = url.split(':');
    const s = w[1].split('/');
    return s[0];
}

function googleSiteUrl(url) {
    const u = `https://www.google.com/search?q=$!q&as_sitesearch=${getHost(url)}`;
    return u;
}

function populateDialogAdd(googleSite) {
    currentTab = getCurrentTab();
    formAdd.inputName.value = currentTab.title;
    if (googleSite) {
        formAdd.inputUrl.value = googleSiteUrl(currentTab.url);
    } else {
        formAdd.inputUrl.value = stripQueryValue(currentTab.url);
    }
    initTitleTrim(currentTab.title);
}

function showElementById(id, display) {
    document.getElementById(id).style.display = display;
}

function add(googlesite) {
    populateDialogAdd(googlesite);
    populateOptions();
    showElementById('dialogAdd', 'block');
}

function setName(s) {
    formAdd.inputName.value = s;
}

function trimTitle1() {
    setName(getTitleParts(currentTab.title)[0]);
}

function trimTitle2() {
    setName(getTitleParts(currentTab.title)[1]);
}

function trimTitle12() {
    setName(currentTab.title);
}

function newCategory() {
    const answer = prompt('New category');
    if (answer) {
        chrome.runtime.sendMessage({
            cmd: 'saveCategory',
            id: '-1',
            name: answer
        }, response => {
            populateOptions(response.newId);
        })
    }
}

function submit(e) {
    if (e.key === 'Enter') {
        save();
    }
    if (e.key === 'Escape') {
        window.close();
    }
}

function resetUrl() {
    formAdd.inputUrl.value = currentTab.url;
}

function googleSite() {
    add(true);
}

function initEvents() {
    bindToElements('click', [
        ['cmdSearchPage', searchPage],
        ['cmdOptionsPage', optionsPage],
        ['cmdAdd', add],
        ['cmdGoogleSite', googleSite],
        ['btnSave', save],
        ['btnNewCategory', newCategory],
        ['labelUrl', resetUrl],
        ['trim-title-1', trimTitle1],
        ['trim-title-2', trimTitle2],
        ['trim-title-1-2', trimTitle12],
    ]);
    bindToElements('keyup', [
        ['inputName', submit],
        ['inputUrl', submit],
        ['selectCategory', submit],
    ])
}

export {initEvents}
