import config from "../common/config.js";
import {getDataFromStorage} from "../common/persist.js";
import {downloadJson, downloadStatic} from "../common/download.js";

let importedData;

function getImportedData() {
    return importedData;
}

function setImportedData(data) {
    importedData = data;
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

function exportJson() {
    const filename = config.transportFileNameJson;
    getDataFromStorage(data => {
        downloadJson(data, filename);
    })
}

function onReaderLoad(e) {
    setImportedData(e.detail.content);
    if (e.detail.content) {
        document.getElementById('btnImportData')
            .style.display = 'block';
    }
}

function initImport() {
    const filesInput = document.querySelector('files-input');
    filesInput.header = 'Read data';
    filesInput.addEventListener('load', onReaderLoad);
}

export {getImportedData, setImportedData, initImport,
    exportJson, exportStatic, restoreData}
