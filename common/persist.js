import config from "./config.js";
import {getCategories} from "./fetch.js";
import {setCategories} from "./update.js";

function getInitialData() {
    // const urlToInitialData = '../initial_data_deploy.json';
    fetch('../' + config.initialDataFile)
        .then(response => response.json())
        .then(categories => setCategories(categories));
}

function dataFromStorage() {
    getCategories().then(categories => {
        if (!categories) {
            getInitialData();
        }
    })
}

function getCategoriesFromStorage() {
    const testInitial = false;
    if (testInitial) {
        getInitialData();
    } else {
        dataFromStorage();
    }
}

export {getCategoriesFromStorage}
