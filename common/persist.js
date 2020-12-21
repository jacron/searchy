import config from "./config.js";
import categories from "../categories.js";

const key = config.storageKeyCategories;

function persistData(data) {
    chrome.storage.local.set({[key]: data.categories}, () => {})
}

function getDataFromStorage(cb) {
    // chrome.storage.local.get(null, result => {
    //     console.log({result});
    // })
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
