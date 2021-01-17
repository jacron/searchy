import {template} from './HelpTour.template.js';

class HelpTour extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({mode: 'open'}); // sets and returns 'this.shadowRoot'
        this.shadowRoot.appendChild(this.createWrapper());
    }

    set header(s) {
        this.headerElement.textContent = s;
    }

    set message(s) {
        this.messageElement.textContent = s;
    }

    dispatch(content, name) {
        this.dispatchEvent(new CustomEvent('load', {
            detail: {content, name},
            bubbles: true
        }))
    }

    hideNext() {
        this.nextButton.style.display = 'none';
    }

    showNext() {
        this.nextButton.style.display = 'inline-block';
    }

    focusSkip() {
        this.skipButton.focus();
    }

    focusNext() {
        this.nextButton.focus();
    }

    slideLeft(state) {
        if (state) {
            if (state > 0) {
                this.tour.classList.add('slide-left');
            } else {
                this.tour.classList.add('slide-right');
            }
        } else {
            this.tour.classList.remove('slide-left');
            this.tour.classList.remove('slide-right');
        }
    }

    dispatchClick(action) {
        this.dispatchEvent(new CustomEvent('navigate', {
            detail: {action},
            bubbles: true,
        }))
    }

    createWrapper() {
        const wrapper = document.createElement('div');
        wrapper.innerHTML = template;
        this.tour = wrapper.querySelector('#tour');
        this.headerElement = wrapper.querySelector('#adviceHeader');
        this.messageElement = wrapper.querySelector('#adviceMessage');
        this.nextButton = wrapper.querySelector('#nextAdvice');
        this.skipButton = wrapper.querySelector('#skipTour');
        this.nextButton.addEventListener('click', () => this.dispatchClick('next'));
        this.skipButton.addEventListener('click', () => this.dispatchClick('skip'));
        return wrapper;
    }
}

function initHelpTour() {
    customElements.define('help-tour', HelpTour);
}

export {initHelpTour}
