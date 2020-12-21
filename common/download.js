function download(blobParts, mimeType, filename) {
    const blob = new Blob(blobParts, {type: mimeType});
    const url = window.URL.createObjectURL(blob);
    chrome.downloads.download({
        url,
        filename,
        saveAs: true
    })
}

function downloadJson(records, filename) {
    const json = JSON.stringify(records);
    download([json], 'text/json', filename);
}

function downloadHtml(html, filename) {
    download([html], 'text/html', filename);
}

export {downloadJson, downloadHtml}
