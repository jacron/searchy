function numberWithCommas(x) {
    const parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}

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

/**
 * get domain: protocol plus the url up to the first slash.
 * @param url {string}
 * @return {string|*}
 */
function getDomain(url) {
    if (!url) { return url }
    const parts = url.split('//');
    const protocol = parts[0];

    const parts2 = parts[1].split('/');
    return protocol + '//' + parts2[0];
}

function getDomainOfUrl(url) {
    if (!url) { return url }
    const parts = url.split('//');
    const parts2 = parts[1].split('/');
    return parts2[0];
}

function rtrimSlash(s) {
    if (!s) {
        return s;
    }
    if (s[s.length - 1] === '/') {
        return s.substr(0, s.length - 1);
    } else {
        return s;
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
            return ' ' + word + ' ';
        }
    }
    return null;
}

function shortDate(timestamp) {
    return new Date(timestamp).toLocaleDateString(chrome.i18n.getUILanguage(), {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    })
    // return new Date(timestamp).toLocaleDateString(chrome.i18n.getUILanguage());
}

/**
 *
 * @param pubDateString {string}
 * @return {string}
 */
function localizedTimediff(pubDateString) {
    let pubDate = new Date(pubDateString);
    const now = Date.now();
    const diff = (now - pubDate) / 1000 / 60;  // minuten

    // let pubDate;
    // let years = ' jaren';
    // let year = ' jaar';
    let months = ' mnd';
    let days = ' dagen';
    let hours = ' uur';
    let ago = ' geleden'
    if (chrome.i18n.getUILanguage().substr(0, 2) === 'en') {
        // years = ' yrs';
        // year = ' year';
        months = ' mon';
        days = ' days'
        hours = ' hrs';
        ago = ' ago';
    }
    const uur = 60;
    const dag = uur * 24;
    const maand = dag * 30;

    if (diff < uur) {
        pubDate = Math.round(diff) + ' min';
    } else if (diff < dag){
        pubDate = Math.round(diff/uur) + hours;
    } else if (diff < maand ) {
        pubDate = Math.round(diff /dag) + days;
    } else {
        pubDate = Math.round(diff / maand) + months;
    }
    pubDate += ago;
    return pubDate;
}

function stripCdata(s) {
    // <![CDATA[Trump escalates anti-China campaign with Hong Kong sanctions]]>
    return s.replace('<![CDATA[', '').replace(']]>', '');
}

function htmlDecode(input){
    const e = document.createElement('textarea');
    e.innerHTML = input;
    // handle case of empty input
    return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
}

function camel(s) {
    const parts = s.split('-');
    let result = parts[0];
    if (parts.length > 1) {
        for (let i = 1; i < parts.length; i++) {
            result += parts[i][0].toUpperCase() + parts[i].substr(1);
        }
    }
    return result;
}

function kebab(s) {
    let t = '';
    for (let i = 0; i < s.length; i++) {
        const ch = s[i];
        if (ch === ch.toUpperCase() && ch !== ch.toLowerCase()) {
            t += '-' + ch.toLowerCase();
        } else {
            t += ch;
        }
    }
    return t;
}

function ltrimSpecial(s, specials) {
    for (const special of specials) {
        if (s[0] === special) {
            return s.substr(1);
        }
    }
    return s;
}

function arrayToText(lines) {
    return lines  && Array.isArray(lines) ? lines.join('\n') : '';
}

function textToArray(s) {
    return s.split('\n').filter(item => item.length);
}

function setDisabled(element, on) {
    if (on) {
        element.setAttribute('disabled', 'true');
    } else {
        element.removeAttribute('disabled');
    }
}

function inValidPaste(text, prefix) {
    return !(text && text.length > prefix.length && text.startsWith(prefix));
}

export {numberWithCommas, getExtension, getFilename, stripCdata,
    camel, kebab, ltrimSpecial, shortDate, getTitleParts,
    getDomain, getDomainOfUrl, getDelim, localizedTimediff,
    arrayToText, textToArray, htmlDecode, rtrimSlash, setDisabled,
    inValidPaste, getTypeFromMimetype}
