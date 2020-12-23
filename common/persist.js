import config from "./config.js";
import {categories} from "../initial_data.js";

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

function showLocalStorage() {
    chrome.storage.local.get(null, result => {
        console.log({result});
    })
}

function getDataFromStorage(cb) {
    // showLocalStorage();

    // test with static
    // cb(categories); // static data
    // return;

    chrome.storage.local.get([key], result => {
        // console.log('Value currently is ', result[key]);
        if (result[key]) {
            cb(result[key]);
        } else {
            cb(categories); // static data
        }
    })

}

export {persistData, getDataFromStorage}
