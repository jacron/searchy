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

    hideNext() {
        this.nextButton.style.display = 'none';
        this.skipButton.style.display = 'none';
        this.endButton.style.display = 'inline-block';
    }

    showNext() {
        this.nextButton.style.display = 'inline-block';
        this.skipButton.style.display = 'inline-block';
        this.endButton.style.display = 'none';
    }

    focusEnd() {
        this.endButton.focus();
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

    dispatchKeydown(e) {
        if (e.key === 'Escape') {
            console.log('escape')
            this.dispatchClick('skip')
        }
    }

    createWrapper() {
        const wrapper = document.createElement('div');
        wrapper.innerHTML = template;
        this.tour = wrapper.querySelector('#tour');
        this.headerElement = wrapper.querySelector('#adviceHeader');
        this.messageElement = wrapper.querySelector('#adviceMessage');
        this.nextButton = wrapper.querySelector('#nextAdvice');
        this.skipButton = wrapper.querySelector('#skipTour');
        this.endButton = wrapper.querySelector('#endTour');
        this.nextButton.addEventListener('click', () => this.dispatchClick('next'));
        this.skipButton.addEventListener('click', () => this.dispatchClick('skip'));
        this.endButton.addEventListener('click', () => this.dispatchClick('skip'));
        this.tour.addEventListener('keydown', (e) => this.dispatchKeydown(e))
        return wrapper;
    }
}

function initHelpTour() {
    customElements.define('help-tour', HelpTour);
}

export {initHelpTour}
