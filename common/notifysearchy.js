function notifysearchy() {
    // console.log('notified');
    chrome.runtime.sendMessage({
        notify: 'data changed'
    })
}

export {notifysearchy}
