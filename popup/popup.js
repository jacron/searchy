const formAdd = {
    inputName: document.getElementById('inputName'),
    inputUrl: document.getElementById('inputUrl'),
    selectCategory: document.getElementById('selectCategory'),
    cmdSave: document.getElementById('btnSave'),
}

let currentTab;

function version() {
    const manifestData = chrome.runtime.getManifest();
    document.getElementById('version').innerText =
        'v' + manifestData.version;
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

function getCurrentTab(cb) {
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function(tabs) {
        console.log({tabs});
        cb(tabs.length > 0 ? tabs[0] : null);
    });
}

function stripQueryValue(url) {
    ['?q=', '&q=']
        .map(queryKey => {
            const pos = url.indexOf(queryKey);
            if (pos !== -1) {
                url = url.substr(0, pos + queryKey.length);
            }
        })
    return url;
}

function populateDialogAdd() {
    formAdd.inputName.value = currentTab.title;
    formAdd.inputUrl.value = stripQueryValue(currentTab.url);
}

function showElementById(id, display) {
    document.getElementById(id).style.display = display;
}

function add() {
    populateDialogAdd();
    populateOptions();
    showElementById('dialogAdd', 'block');
}

function showAddOption() {
    showElementById('delimiterAdd', 'inline');
    showElementById('cmdAdd', 'inline');
}

function populateOptions() {
    const selectElement = document.getElementById('selectCategory');
    selectElement.innerHTML = '';
    chrome.runtime.sendMessage({cmd: 'getCategories'}, response => {
        response.categories.map(category => {
            const option = document.createElement('option');
            option.value = category.id;
            option.label = category.name;
            selectElement.appendChild(option);
        });
    })
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

function dialogEvents() {
    document.getElementById('cmdAdd')
        .addEventListener('click', add)
    document.getElementById('btnSave')
        .addEventListener('click', save)
}

function events() {
    document.getElementById('cmdSearchPage')
        .addEventListener('click', searchPage)
    document.getElementById('cmdOptionsPage')
        .addEventListener('click', optionsPage)
    getCurrentTab(tab => {
        if (tab) {
            currentTab = tab;
            showAddOption();
            dialogEvents();
        }
    })
}

function init() {
    version();
    events();
}

init();