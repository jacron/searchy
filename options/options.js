import {showEngineLinks} from './create.js';
import {openDialog} from './dialog.js';

function setDark(dark) {
    document.body.className = dark ? 'dark' : '';
}

function darkMode() {
    chrome.runtime.sendMessage({cmd: "getDarkMode"},
        response => setDark(response.dark))
}

function toggleDarkModeEvent() {
    document.getElementById('toggleDark').addEventListener('click', () => {
        chrome.runtime.sendMessage({cmd: 'toggleDarkMode'},
            response => setDark(response.dark))
    })
}

function remove(type, id) {
    chrome.runtime.sendMessage({
        cmd: 'remove',
        type,
        id
    }, response => {
        showEngineLinks();
    })
}

function onEditClick(e, target, type) {
    const controls = target.parentElement;
    const engine = controls.parentElement;
    const a = engine.querySelector('.name');
    const name = a.textContent;
    const id = engine.getAttribute('data-id');
    if (target.classList.contains('fa-delete')) {
        if (confirm(`Delete ${type} '${name}'?`)) {
            console.log({id});
            remove(type, id);
        }
    }
    if (target.classList.contains('fa-edit')) {
        openDialog(e.pageX, e.pageY);
    }
}

function editEngineEvent() {
    document.getElementById('engines')
        .addEventListener('click', e => {
        const target = e.target;
        if (target.classList.contains('fa')) {
            onEditClick(e, target, 'engine');
        }
    })
}

function editCategoryEvent() {
    document.getElementById('categories')
        .addEventListener('click', e => {
        const target = e.target;
        if (target.classList.contains('fa')) {
            onEditClick(e, target, 'category');
        }
    })
}

function getIdFromCheckbox(target) {
    const visible = target.parentElement;
    const engine = visible.parentElement;
    return engine.getAttribute('data-id');
}

function checkEngineEvent() {
    document.getElementById('engines')
        .addEventListener('change', e => {
            const target = e.target;
            // console.log({target});
            chrome.runtime.sendMessage({
                cmd: 'setVisible',
                value: target.checked,
                id: getIdFromCheckbox(target)
            })
        })
}

function init() {
    darkMode();
    showEngineLinks();
    toggleDarkModeEvent();
    editEngineEvent();
    editCategoryEvent();
    checkEngineEvent();
}

init();
