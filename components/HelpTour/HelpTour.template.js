const template = `
<style>
.bubble {
    position: relative;
    width: 250px;
    padding: 10px;
    background: rgba(240, 100, 100, .55);
    border-radius: 10px;
    backdrop-filter: blur(10px);
}
.dark .bubble {
    background: rgba(240, 100, 100, .55);
}
.bubble:after {
    content: '';
    position: absolute;
    border-style: solid;
    border-width: 0 20px 20px;
    border-color: rgba(240, 100, 100, .55) transparent;
    display: block;
    width: 0;
    z-index: 1;
    top: -20px;
    left: 105px;
    backdrop-filter: blur(10px);
}
.bubble.slide-left:after {
    left: 185px;
}
.bubble.slide-right:after {
    left: 35px;
}
.dark .bubble:after {
    border-color: rgba(240, 100, 100, .55) transparent;
}
.overlay {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
}
#skipTour {
    margin-left: 8px;
}
#nextAdvice {
}
.advice-header {
    font-size: x-large;
    margin-bottom: 3px;
}
.message {
    font-size: large;
    margin-bottom: 3px;
}
.button-bar {
    padding: 6px 2px;
}
.button-bar button {
    padding: 5px 10px;
    border-radius: 6px;
    font-size: 18px;
    color: gray;
}

</style>
<div id="tour" class="tour bubble">
    <div id="adviceHeader" class="advice-header"></div>
    <hr>
    <div id="adviceMessage" class="message"></div>
    <hr>
    <div class="button-bar">
        <button id="nextAdvice">next</button>
        <button id="skipTour">skip</button>
    </div>
</div>
`;

export {template}
