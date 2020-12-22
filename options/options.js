import {displayItems, showEngineLinks} from './options.create.js';
import {
    openDialogCategory, openDialogEngine,
    openDialogAddEngine, openDialogAddCategory,
} from './dialog.js';
import {initDarkmode, toggleDarkmode} from '../common/dark.js';
import {downloadJson, downloadStatic} from '../common/download.js';
import {getDataFromStorage, persistData} from '../common/persist.js';
import config from "../common/config.js";
import {initFilesInput} from '../components/FilesInput/FilesInput.js';

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
    document.getElementById('toggleDark')
        .addEventListener('click', () => {
        toggleDarkmode();
    })
}

function clearSelected() {
    const selectedElements = document.getElementsByClassName('selected');
    for (let i = 0; i < selectedElements.length; i++) {
        selectedElements[i].classList.remove('selected');
    }
}

function onEditClick(e, target, type) {
    clearSelected();
    const controls = target.parentElement;
    const engine = controls.parentElement;
    const a = engine.querySelector('.name');
    const name = a.textContent;
    const id = engine.getAttribute('data-id');
    if (target.classList.contains('fa-delete')) {
        if (confirm(`Delete ${type} '${name}'?`)) {
            remove(type, id);
            clearSelected();
        }
    }
    if (target.classList.contains('fa-edit')) {

        engine.classList.add('selected');

        if (type === 'engine') {
            openDialogEngine(id, result => {
                if (result.msg && result.msg === 'changed') {
                    showEngineLinks();
                }
                clearSelected();
            });
        }
        if (type === 'category') {
            openDialogCategory(id, result => {
                if (result.msg && result.msg === 'changed') {
                    showEngineLinks();
                }
                clearSelected();
            });
        }
    }
    if (target.classList.contains('fa-plus')) {
        openDialogAddEngine(id, result => {
            if (result.msg && result.msg === 'changed') {
                showEngineLinks();
            }
        });
    }
}

function editEngineEvent() {
    document.getElementById('engines')
        .addEventListener('click', e => {
        const target = e.target;
        if (target.classList.contains('fa')) {
            if (target.classList.contains('eng')) {
                onEditClick(e, target, 'engine');
            }
            if (target.classList.contains('cat')) {
                onEditClick(e, target, 'category');
            }
        }
    })
}

function addItemEvent() {
    document.getElementById('addEngine')
        .addEventListener('click', () => {
            openDialogAddEngine(-1, result => {
                if (result.msg && result.msg === 'changed') {
                    showEngineLinks();
                }
            });
        })
    document.getElementById('addCategory')
        .addEventListener('click', () => {
            openDialogAddCategory(result => {
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

function exportJson() {
    const filename = config.transportFileNameJson;
    getDataFromStorage(data => {
        downloadJson(data, filename);
    })
}

function generateStaticJs(categories) {
    let categoryEnginesJs = [];
    let categoriesJs =
        `const categories = [`;

    categories.map(category => {
        categoriesJs += `
    {
        name: "${category.name}",
        id: ${category.id},
        engines: ${category.name}Engines
    },`;
        let enginesJs = `
const ${category.name}Engines = [`;
        category.engines.map(engine => {
            enginesJs += `
    {
        name: "${engine.name}",
        url: "${engine.url}",
        visible: ${engine.visible},
        id: ${engine.id}
    },`;
        });
        enginesJs += `
];
`;
        categoryEnginesJs.push(enginesJs);
    })
    categoriesJs += `
];
`
    return `// static data for Searchy
${categoryEnginesJs.join('')}
${categoriesJs}`;
}

function exportStatic() {
    const filename = config.transportFileNameStatic;
    getDataFromStorage(data => {
        downloadStatic(generateStaticJs(data), filename);
    })

}

function exportEvent() {
    document.getElementById('exportData')
        .addEventListener('click', () => {
            exportJson();
        });
    document.getElementById('exportStaticData')
        .addEventListener('click', () => {
            exportStatic();
        });
}

function restoreData(cb) {
    getDataFromStorage(categories => {
        chrome.runtime.sendMessage({
            cmd: 'setCategories',
            categories
        }, () => {
            cb(categories);
        })
    })
}

function dialogImport(categories) {
    displayItems(categories, () => {
        if (confirm("Do you want to keep these changes?")) {
            persistData({categories});
        } else {
            restoreData(categories => {
                displayItems(categories);
            });
        }
    });
}

function initImportButton() {
    document.getElementById('btnImportData')
        .addEventListener('click', () => {
            const categories = JSON.parse(importedData);
            chrome.runtime.sendMessage({
                cmd: 'setCategories',
                categories
            }, () => {
                dialogImport(categories);
            });
    });
}

let importedData;

function onReaderLoad(e) {
    importedData = e.detail.content;
    if (importedData) {
        document.getElementById('btnImportData')
            .style.display = 'block';
    }
}

function initImport() {
    const filesInput = document.querySelector('files-input');
    filesInput.header = 'Read data';
    filesInput.addEventListener('load', onReaderLoad);
}

function init() {
    initDarkmode();
    showEngineLinks();
    toggleDarkModeEvent();
    editEngineEvent();
    addItemEvent();
    checkEngineEvent();
    exportEvent();
    initFilesInput();
    initImport();
    initImportButton();
}

chrome.runtime.onMessage.addListener((req) => {
    if (req.notify && req.notify === 'data changed') {
        showEngineLinks();
    }
})

init();
