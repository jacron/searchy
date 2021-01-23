function dragenter(e) {
    e.stopPropagation();
    e.preventDefault();
}

function dragover(e) {
    e.stopPropagation();
    e.preventDefault();
}

function drop(e, input, cb) {
    e.stopPropagation();
    e.preventDefault();
    const dt = e.dataTransfer;
    input.files = dt.files;
    if (cb) {
        cb();
    }
}

function initDrop(dropbox, input, cbDrop) {
    dropbox.addEventListener('dragenter', dragenter, false);
    dropbox.addEventListener('dragover', dragover, false);
    dropbox.addEventListener('drop', e => drop(e, input, cbDrop), false);
}

export {initDrop}
