import {hideDialogs} from "./dialog.hide.js";

function initBackground() {
    document.getElementById('dialogBackground')
        .removeEventListener('click', hideDialogs);
    document.getElementById('dialogBackground')
        .addEventListener('click', hideDialogs);
}

function showBackground() {
    document.getElementById('dialogBackground').style.display = 'block';
}

export {initBackground, showBackground}
