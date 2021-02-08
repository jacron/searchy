import {showEngineLinks} from './options.create.js';
import {initDarkmode} from '../../storage/dark.js';
import {initFilesInput} from '../../web-components/FilesInput/FilesInput.js';
import {initEvents} from "./options.events.js";
import {getFirstUseSettingOptionspage} from "../../storage/firsttouroptionspage.js";
import {beginTour} from "../../common/helptour.js";
import {initHelpTour} from "../../web-components/HelpTour/HelpTour.js";
import {initTourEvent} from "../../common/helptour.js";
import {initEnginesDragDropEvents} from "./options.drag.js";
import {advices} from "./options.tour.data.js";

function initFirstUseHelp() {
    getFirstUseSettingOptionspage(set => {
        if (!set) {
            beginTour(advices);
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
    initEnginesDragDropEvents();
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

chrome.storage.onChanged.addListener((changes) => {
    if (changes.categories) {
        // console.log(new Date());
        showEngineLinks();
    }
})

init();
