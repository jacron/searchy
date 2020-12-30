import config from "./config.js";
// import {categories} from "../initial_data.js";

const key = config.storageKeyCategories;

function notifyChange() {
    chrome.runtime.sendMessage({
        notify: 'data changed'
    })
}

function persistData(data) {
    chrome.storage.local.set({[key]: data.categories}, () => {})
    notifyChange();
}

function maintainLocalStorage() {
    const showLocalStorage = false;
    if (showLocalStorage) {
        chrome.storage.local.get(null, result => {
            console.log({result});
        })
    }
    // set true to test if searchy uses initial data when local storage is empty
    const clearLocalStorage = false;
    if (clearLocalStorage) {
        chrome.storage.local.clear(()=>{});
    }
}

function getInitialData(cb) {
    // cb(categories); // static data
    // get json
    const urlToInitialData = '../initial_data_deploy.json';
    fetch(urlToInitialData)
        .then(response => response.json())
        .then(categories => cb(categories));
}

function dataFromStorage(cb) {
    chrome.storage.local.get([key], result => {
        // console.log('Value currently is ', result[key]);
        if (result[key]) {
            cb(result[key]);
        } else {
            // console.log('getting initial data');
            getInitialData(cb);
        }
    })
}

function getDataFromStorage(cb) {
    maintainLocalStorage();

    const testInitial = false;
    if (testInitial) {
        getInitialData(cb);
    } else {
        dataFromStorage(cb);
    }
}

export {persistData, getDataFromStorage}
