import {showEngineLinks} from './options.create.js';
import {initDarkmode} from '../../storage/dark.js';
import {initFilesInput} from '../../components/FilesInput/FilesInput.js';
import {initEvents} from "./options.events.js";
import {getFirstUseSetting} from "../../storage/firstoptions.js";
import {beginTour} from "./options.tour.js";
import {initHelpTour} from "../../components/HelpTour/HelpTour.js";
import {initTourEvent} from "./options.tour.js";

function initFirstUseHelp() {
    getFirstUseSetting(set => {
        if (!set) {
            beginTour();
        }
    });

}

function init() {
    initHelpTour();
    initTourEvent();
    initDarkmode();
    showEngineLinks();
    initFilesInput();
    initEvents();
    initFirstUseHelp();
}

chrome.runtime.onMessage.addListener(req => {
    if (req.notify) {
        switch(req.notify) {
            case 'data changed':
            case 'default engine set':
                showEngineLinks();
                break;
        }
    }
})

init();
