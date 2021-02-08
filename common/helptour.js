import {Helptour} from "./helptour.class.js";
import {setFirstUseSettingSearchpage} from "../storage/firsttoursearchpage.js";

const overlay = document.getElementById('tourOverlay');
const helpTour = document.querySelector('help-tour');
let helptour;

function beginTour(advices) {
    helptour = new Helptour(overlay, helpTour, advices,
            mode => setFirstUseSettingSearchpage(mode));
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
