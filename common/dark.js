function setDark(dark) {
    document.body.className = dark ? 'dark' : '';
}

function darkMode() {
    chrome.runtime.sendMessage({cmd: "getDarkMode"},
        response => setDark(response.dark))
}

export {darkMode, setDark}
