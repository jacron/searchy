class Helptour {
    constructor(overlay, helptour, advices, cb) {
        this.step = 0;
        this.overlay = overlay;
        this.helpTour = helptour;
        this.advices = advices;
        this.cb = cb;
    }

    firstUseHelp() {
        this.overlay.style.display = 'block';
        const advice = this.advices[this.step];
        const adviceElement = advice.element();
        if (!adviceElement) {
            this.nextAdvice();
            return;
        }
        const top = adviceElement.offsetTop;
        const left = adviceElement.offsetLeft;
        this.helpTour.style.top = (top + advice.offsetTop) + 'px';
        this.helpTour.style.left = (left - 105 + advice.offsetLeft) + 'px';
        this.helpTour.header = advice.header;
        this.helpTour.message = advice.message;
        if (this.step === this.advices.length - 1) {
            this.helpTour.hideNext();
            this.helpTour.focusSkip();
        } else {
            this.helpTour.showNext();
            this.helpTour.focusNext();
        }
        if (advice.bubbleSlideLeft) {
            this.helpTour.slideLeft(advice.bubbleSlideLeft);
        } else {
            this.helpTour.slideLeft(false);
        }
    }

    closeTour() {
        this.overlay.style.display = 'none';
        this.cb(true);
    }

    nextAdvice() {
        if (this.step < this.advices.length - 1) {
            this.step++;
            this.firstUseHelp();
        } else {
            this.closeTour();
        }
    }

    skipTour() {
        this.closeTour();
    }

    act(action) {
        switch (action) {
            case 'next':
                this.nextAdvice();
                break;
            case 'skip':
                this.skipTour();
                break;
        }

    }

}

export {Helptour}
