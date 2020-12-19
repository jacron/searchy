const config = {
    // JCDownloadUrl: "http://downloader/#/search?q=",
    searchPage: "search.html"
};

const data = {
    selectedTerm: ""
}

chrome.contextMenus.create(
    {
        title: `Searchy "%s"`,
        contexts:["selection"],
        onclick: info => {
            data.selectedTerm = info.selectionText;
            chrome.tabs.create({
                url: config.searchPage
            });
        }});

chrome.runtime.onMessage.addListener(
    (request, sender, sendResponse) => {
    if (request.cmd === "getSelectedTerm") {
        sendResponse({term: data.selectedTerm})
    }
})

function btnClicked() {
    chrome.tabs.query({
        active: true,
        lastFocusedWindow: true
    }, function(tabs) {
        const tab = tabs[0];
        chrome.tabs.update(tab.id, {
            url: config.searchPage,
        });
    });
}

chrome.browserAction.onClicked.addListener(btnClicked);
