/*
called from background
prepare position for popup
open dialog in popup
 */

const createData = {
    url: 'background/addEngine/addEngine.html',
    type: 'popup',
    width: 440,
    height: 260,
    left: 10,
    top: 40,
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

export {openDialog}
