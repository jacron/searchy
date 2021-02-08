function getExtension(fileName) {
    const pos = fileName.lastIndexOf('.');
    if (pos === -1) return null;
    return fileName.substr(pos + 1);
}

/**
 * strip extension
 * @param fileName
 * @return {string|null}
 */
function getFilename(fileName) {
    const pos = fileName.lastIndexOf('.');
    if (pos === -1) return null;
    return fileName.substr(0, pos);
}

function getTypeFromMimetype(mimetype) {
    const parts = mimetype.split('/');
    if (parts.length > 1) {
        return parts[1];
    } else {
        return mimetype;
    }
}

function getTitleParts(s) {
    const delim = getDelim(s);
    return s.split(delim);
}

function getDelim(s) {
    if (!s) { return null }

    if (s.indexOf(':') !== -1) {
        return ':';
    }
    const words = s.split(' ');
    for (let word of words) {

        // return any word of one non-letter as a delimiter
        if (word.length === 1 && !/[a-zA-Z0-9]/.test(word)) {
            // surround with one space on either side
            return ' ' + word + ' ';
        }
    }
    return null;
}

export {getExtension, getFilename, getTitleParts,
    getDelim, getTypeFromMimetype}
