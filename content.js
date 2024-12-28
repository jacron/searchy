// content.js
window.addEventListener('message', (event) => {
    if (event.source !== window || !event.data.type) return;

    if (event.data.type === 'CALL_SEARCHY') {
        chrome.runtime.sendMessage(
            {request: 'search', query: event.data.query},
            (response) => {
                // console.log('Antwoord van extensie:', response);
            }
        );
    }
});
