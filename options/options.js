import {showEngineLinks} from './options.create.js';
import {openDialogCategory, openDialogEngine,
    openDialogAddEngine, openDialogAddCategory} from './dialog.js';
import {darkMode, setDark} from '../common/dark.js';

function remove(type, id) {
    if (type === 'engine') {
        chrome.runtime.sendMessage({
            cmd: 'removeEngine',
            id
        }, () => {
            showEngineLinks();
        })
    }
    if (type === 'category') {
        chrome.runtime.sendMessage({
            cmd: 'removeCategory',
            id
        }, response => {
            if (response.msg && response.msg === 'ok') {
                showEngineLinks();
            } else {
                alert("Can't remove category that contains engines");
            }
        })
    }
}

function toggleDarkModeEvent() {
    document.getElementById('toggleDark').addEventListener('click', () => {
        chrome.runtime.sendMessage({cmd: 'toggleDarkMode'},
            response => setDark(response.dark))
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
            remove(type, id);
        }
    }
    if (target.classList.contains('fa-edit')) {
        if (type === 'engine') {
            openDialogEngine(e.pageX, e.pageY, id, result => {
                if (result.msg && result.msg === 'changed') {
                    showEngineLinks();
                }
            });
        }
        if (type === 'category') {
            openDialogCategory(e.pageX, e.pageY, id, result => {
                if (result.msg && result.msg === 'changed') {
                    showEngineLinks();
                }
            });
        }
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

function addItemEvent() {
    document.getElementById('addEngine')
        .addEventListener('click', e => {
            openDialogAddEngine(e.pageX, e.pageY, result => {
                if (result.msg && result.msg === 'changed') {
                    showEngineLinks();
                }
            });
        })
    document.getElementById('addCategory')
        .addEventListener('click', e => {
            openDialogAddCategory(e.pageX, e.pageY, result => {
                if (result.msg && result.msg === 'changed') {
                    showEngineLinks();
                }
            });
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
    addItemEvent();
    checkEngineEvent();
}

init();
