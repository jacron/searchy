import {setFirstUseSetting} from "../storage/first.js";

const element = {
    overlay: document.getElementById('tourOverlay'),
    tour: document.getElementById('tour'),
    header: document.getElementById('adviceHeader'),
    message: document.getElementById('adviceMessage'),
    nextButton: document.getElementById('nextAdvice'),
    skipButton: document.getElementById('skipTour'),
}
const advices = [
    {
        element: () => document.getElementById('toggleDark'),
        header: 'Omnibox',
        message: "In the omnibox, type 'sy ' to use Searchy for searching.",
        offsetTop: 10,
        offsetLeft: -260
    },
    {
        element: () => document.getElementById('pageOptions'),
        header: 'Options',
        message: 'Add or change your search engines for Searchy.',
        offsetLeft: -90,
        offsetTop: 40,
        bubbleSlideLeft: true,
    },
    {
        element: () => {
            const titles = document.querySelectorAll('.category-title');
            return titles[0];
        },
        header: 'Group Header',
        message: 'Open all engines in the group in separate tabs.',
        offsetLeft: 60,
        offsetTop: 48,
    },
    {
        element: () => document.getElementById('newTab'),
        header: 'Open in new Tab',
        message: 'Check this to open each engine in a new tab.',
        offsetLeft: -15,
        offsetTop: 40
    },
    {
        element: () => document.getElementById('toggleDark'),
        header: 'Toggle Dark',
        message: 'Turn dark mode on/off.',
        offsetLeft: -15,
        offsetTop: 40
    },
    {
        element: () => document.getElementById('toggleRecent'),
        header: 'Toggle Recent',
        message: 'Recently used search terms display on/off.',
        offsetLeft: -15,
        offsetTop: 40,
    },
    {
        element: () => document.getElementById('help'),
        header: 'Help',
        message: 'Repeat this help tour.',
        offsetLeft: -90,
        offsetTop: 40,
        bubbleSlideLeft: true
    }
];

let step = 0;

function beginTour() {
    step = 0;
    firstUseHelp();
}

function firstUseHelp() {
    element.overlay.style.display = 'block';
    const advice = advices[step];
    const adviceElement = advice.element();
    if (!adviceElement) {
        nextAdvice();
        return;
    }
    const top = adviceElement.offsetTop;
    const left = adviceElement.offsetLeft;
    element.tour.style.top = (top + advice.offsetTop) + 'px';
    element.tour.style.left = (left - 105 + advice.offsetLeft) + 'px';
    element.header.textContent = advice.header;
    element.message.textContent = advice.message;
    if (step === advices.length - 1) {
        element.nextButton.style.display = 'none';
        element.skipButton.focus();
    } else {
        element.nextButton.style.display = 'inline-block';
        element.nextButton.focus();
    }
    if (advice.bubbleSlideLeft) {
        element.tour.classList.add('slide-left');
    } else {
        element.tour.classList.remove('slide-left');
    }
}

function closeTour() {
    element.overlay.style.display = 'none';
    setFirstUseSetting(true);
}

function nextAdvice() {
    if (step < advices.length - 1) {
        step++;
        firstUseHelp();
    } else {
        closeTour();
    }
}

function skipTour() {
    closeTour();
}

export {firstUseHelp, nextAdvice, skipTour, beginTour}
