const searchPage = "search/search.html";

const createData = {
    url: 'addEngine/addEngine.html',
    type: 'popup',
    width: 440,
    height: 260,
    left: 10,
    top: 40,
};

const menuItemIds = {
    add_page: 'menu_searchy_add_page',
    on_selection: 'menu_searchy_on_selection',
};

function calcPopupPosition(currentTabWindow) {
    if (currentTabWindow) {
        const newLeft = currentTabWindow.left + (currentTabWindow.width / 2)
            - (createData.width / 2);
        createData.left = Math.round(newLeft);
        createData.top = currentTabWindow.top + 100;
    }
}

function openDialog(win) {
    calcPopupPosition(win);
    chrome.windows.create(createData);
}

function openDialogNewEngine() {
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function(tabs) {
        const currentTab = tabs.length > 0 ? tabs[0] : null;
        chrome.storage.local.set({currentTab})
        chrome.windows.get(currentTab.windowId, win => {
            openDialog(win);
        });
    });
}

function openSearchyWithSelection(selectedTerm) {
    chrome.storage.local.set({
        selectedTerm
    })
    chrome.tabs.create({
        url: searchPage
    });
}

chrome.contextMenus.create(
    {
        id: menuItemIds.on_selection,
        title: `Searchy "%s"`,
        contexts: ["selection"],
    });

chrome.contextMenus.create(
    {
        id: menuItemIds.add_page,
        title: `Searchy: add this page to engines`,
        contexts: ["page"],
        documentUrlPatterns: [
            "https://*/*",
            "http://*/*"
        ],
    });

chrome.contextMenus.onClicked.addListener(info => {
    switch(info.menuItemId) {
        case menuItemIds.add_page:
            openDialogNewEngine();
            break;
        case menuItemIds.on_selection:
            openSearchyWithSelection(info.selectionText);
            break;
    }
});

function searchInCurrentTab() {
    let url = searchPage;
    chrome.tabs.query({
        active: true,
        lastFocusedWindow: true
    }, function(tabs) {
        const tab = tabs[0];
        chrome.tabs.update(tab.id, {url});
    });
}

function setSearchTerm(selectedTerm) {
    chrome.storage.local.set({selectedTerm});
}

function handleOmniboxInputEntered(text) {
    setSearchTerm(text);
    searchInCurrentTab();
}

let currentSuggestions;

function makeSuggestion(q, content) {
    // keep it simple, so we can delete a term simply
    const description = content;

    // const start = content.indexOf(q);
    // const description = content.substr(0, start) +
    //     '<match>' + q + '</match>' +
    //     content.substr(start + q.length) +
    //     '<dim> - searchy</dim>';
    return {
        content,
        deletable: true,
        description,
    }
}

function handleOmniboxInputChanged(q, suggest) {
    if (q.length > 1) {
        chrome.storage.local.get('terms', res => {
            currentSuggestions = [];
            res.terms.filter(item => item.indexOf(q) !== -1)
              .forEach(item => {
                currentSuggestions.push(makeSuggestion(q, item))
            });
            suggest(currentSuggestions);
        })
    }
}

function handleOmniboxDeleteSuggestion(text) {
    // const suggestion = currentSuggestions.find(item => item.description === text);
    chrome.storage.local.get('terms', res => {
        chrome.storage.local.set({terms: res.terms.filter(item => item !== text)});
    })
}

function handleActionClicked() {
    searchInCurrentTab();
}

// manifest v3: chrome.action...
chrome.browserAction.onClicked.addListener(handleActionClicked);
chrome.omnibox.onInputChanged.addListener(handleOmniboxInputChanged);
chrome.omnibox.onInputEntered.addListener(handleOmniboxInputEntered);
chrome.omnibox.onDeleteSuggestion.addListener(handleOmniboxDeleteSuggestion);

function setCategories(categories) {
    chrome.storage.sync.set({categories});
}

function getCategories() {
    return new Promise((resolve) => {
        chrome.storage.sync.get('categories', res => resolve(res.categories))
    });
}

function getInitialData() {
    const urlToInitialData = '../initial_data_deploy.json';
    fetch(urlToInitialData)
        .then(response => response.json())
        .then(categories => setCategories(categories));
}

function dataFromStorage() {
    getCategories().then(categories => {
        if (!categories) {
            getInitialData();
        }
    })
}

function init() {
    const testInitial = false;
    if (testInitial) {
        getInitialData();
    } else {
        dataFromStorage();
    }
}

init();
