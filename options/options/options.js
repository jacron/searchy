import {showEngineLinks} from './options.create.js';
import {initDarkmode} from '../../storage/dark.js';
import {initFilesInput} from '../../web-components/FilesInput/FilesInput.js';
import {initEvents} from "./options.events.js";
import {getFirstUseSettingOptionspage} from "../../storage/firsttouroptionspage.js";
import {beginTour} from "../../common/helptour/helptour.js";
import {initHelpTour} from "../../web-components/HelpTour/HelpTour.js";
import {initTourEvent} from "../../common/helptour/helptour.js";
import {initEnginesDragDropEvents} from "./options.drag.js";
import {advices} from "./options.tour.data.js";
import {initEditable} from "../../storage/editable.js";
import {initTypeAhead} from "../../web-components/TypeAhead/TypeAhead.js";
import {initTypeAheadEvents} from "../../search/search.typeahead.events.js";
import {initTypeAheadList} from "../../web-components/TypeAheadList/TypeAheadList.js";
import {initTypeAheadSearch} from "../../search/search.typeaheadSearch.js";

function initFirstUseHelp() {
    getFirstUseSettingOptionspage(set => {
        if (!set) {
            beginTour(advices, 'options');
        }
    });
}

function init() {
    initHelpTour();
    initTourEvent();
    initTypeAhead();
    initTypeAheadList();
    initTypeAheadSearch();
    initTypeAheadEvents('body');
    initEditable();
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
        showEngineLinks();
    }
})

initDarkmode(() => init());
