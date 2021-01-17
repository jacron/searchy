import {setFirstUseSetting} from "../storage/first.js";
import {advices} from './search.tour.data.js';
import {Helptour} from "../common/helptour.js";

const overlay = document.getElementById('tourOverlay');
const helpTour = document.querySelector('help-tour');
let helptour;

function beginTour() {
    helptour = new Helptour(overlay, helpTour, advices, mode => setFirstUseSetting(mode));
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
