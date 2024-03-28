import {Helptour} from "./helptour.class.js";
import {setFirstUseSettingSearchpage} from "../../storage/firsttoursearchpage.js";
import {setFirstUseSettingOptionspage} from "../../storage/firsttouroptionspage.js";

const overlay = document.getElementById('tourOverlay');
const helpTour = document.querySelector('help-tour');
let helptour;

function setFirstUse(mode, page) {
    if (page === 'search') {
        setFirstUseSettingSearchpage(mode);
    } else if (page === 'options') {
        setFirstUseSettingOptionspage(mode);
    }
}

function beginTour(advices, page) {
    helptour = new Helptour(overlay, helpTour, advices,
            mode => setFirstUse(mode, page));
    helptour.firstUseHelp();
}

function handleHelpClicked(e) {
    if (e.detail.action) {
        helptour.act(e.detail.action);
    }
}

function initTourEvent() {
    helpTour.addEventListener('navigate', handleHelpClicked)
}

export {beginTour, initTourEvent}
