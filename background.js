const searchPage = "options/options/options.html";

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

chrome.contextMenus.create({
        id: menuItemIds.on_selection,
        title: `Searchy "%s"`,
        contexts: ["selection"],
    }, () => {
        if (chrome.runtime.lastError) {
            console.log(chrome.runtime.lastError.message);
        }
});

chrome.contextMenus.create({
        id: menuItemIds.add_page,
        title: `Searchy: add this page to engines`,
        contexts: ["page"],
        documentUrlPatterns: [
            "https://*/*",
            "http://*/*"
        ],
    }, () => {
        if (chrome.runtime.lastError) {
            console.log(chrome.runtime.lastError.message);
        }
});

function contextMenuClickListener(info) {
    switch(info.menuItemId) {
        case menuItemIds.add_page:
            openDialogNewEngine();
            break;
        case menuItemIds.on_selection:
            openSearchyWithSelection(info.selectionText);
            break;
    }
}

function openInNewTab(url) {
    chrome.tabs.create({url}).then();
}

function handleActionClicked() {
    openInNewTab(searchPage);
}


function setCategories(categories) {
    chrome.storage.sync.set({categories});
}

function getInitialData() {
    const urlToInitialData = '../initial_data_deploy.json';
    fetch(urlToInitialData)
        .then(response => response.json())
        .then(categories => setCategories(categories));
}

function messageListener(req, sender, sendResponse) {
    if (req.request && req.request === 'getinitial') {
        getInitialData();
        sendResponse({data: 'is fetched'});
    }
    if (req.request && req.request === 'search') {
        sendResponse({data: 'is searched. . .'})
        chrome.storage.local.set({selectedTerm: req.query}).then(
            () => openInNewTab(searchPage)
        );
    }
}

function init() {
    const testInitial = false;  // set true to force initialisation
    if (testInitial) {
        getInitialData();
    }
}

chrome.action.onClicked.addListener(handleActionClicked);
chrome.runtime.onMessage.addListener(messageListener);
chrome.contextMenus.onClicked.addListener(contextMenuClickListener);
init();

