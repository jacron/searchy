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

function fragmentCategory(category) {
    return `
    {
        name: "${category.name}",
        id: ${category.id},
        engines: ${category.name}Engines
    },`
}

function fragmentEngine(engine) {
    return `
    {
        name: "${engine.name}",
        url: "${engine.url}",
        visible: ${engine.visible},
        id: ${engine.id}
    },`
}

function headerCategories() {
    return `const categories = [`;
}

function headerEngines(name) {
    return `
const ${name}Engines = [`
}

function arrayTail() {
    return `
];
`;
}

function staticCommentHeader() {
    return '// static data for Searchy';
}

function generateStaticJs(categories) {
    let categoryEnginesJs = [];
    let categoriesJs = headerCategories();
    categories.map(category => {
        categoriesJs += fragmentCategory(category) ;
        let enginesJs = headerEngines(category.name);
        category.engines.map(engine => {
            enginesJs += fragmentEngine(engine);
        });
        enginesJs += arrayTail();
        categoryEnginesJs.push(enginesJs);
    })
    categoriesJs += arrayTail();
    return `${staticCommentHeader()}
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
