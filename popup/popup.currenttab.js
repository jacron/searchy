let currentTab;

function setCurrentTab() {
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function(tabs) {
        // console.log({tabs});
        currentTab = tabs.length > 0 ? tabs[0] : null;
    });
}

function getCurrentTab() {
    return currentTab;
}

export {setCurrentTab, getCurrentTab}
