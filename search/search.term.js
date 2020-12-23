const inputTerm = document.getElementById("term");

function setSearchTermFromBackground() {
    chrome.runtime.sendMessage({cmd: "getSelectedTerm"},
        response => {
            inputTerm.value = response.term;
        })
}

function getTerm() {
    return inputTerm.value;
}

export {setSearchTermFromBackground, getTerm}
