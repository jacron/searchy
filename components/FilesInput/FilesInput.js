import {getExtension, getFilename, getTypeFromMimetype}
    from "./stringutils.js";
import {initDrop} from "./drop.js";

const template = `
<style>
    #content {
        padding: 8px 16px 16px 16px;
        border: #9999cc dashed 2px;
        border-radius: 12px;
    }
</style>
<div id="content">
    <h3>read...</h3>
    <input type="file" accept="">
</div>
`;

/**
 * e.g. <files-input accept="application/json" header="Read Bookmarks (json)"></files-input>
 * NB dit werkte niet:
 // this.shadowRoot.appendChild(this.styleSheet('./FilesInput.css'));
 */
class FilesInput extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'}); // sets and returns 'this.shadowRoot'
        this.shadowRoot.appendChild(this.createWrapper());
        this.initDrop();
    }

    initDrop() {
        initDrop(
            this.content,
            this.content.querySelector('input'),
            () => this.onChange()
        );
    }

    set header(text) {
        this.content.querySelector('h3').textContent = text
        this.setAttribute('header', text);
    }

    set accept(mimetype) {
        this.setAttribute('accept', mimetype);
        this.input.setAttribute('accept', mimetype);
    }

    resetInput() {
        this.input.value = "";
    }

    dispatch(content, name) {
        this.dispatchEvent(new CustomEvent('load', {
            detail: {content, name},
            bubbles: true
        }))
    }

    onReaderLoad(e) {
        this.dispatch(e.target.result, this.name);
    }

    handleInputSave(file) {
        this.name = getFilename(file.name);
        if (!file || !this.name.length) {
            return;
        }
        const type = getExtension(file.name);
        const allowedType = getTypeFromMimetype(this.getAttribute('accept'));
        if (type !== allowedType) {
            this.dispatch(null, null);
            return;
        }
        const fileReader = new FileReader();
        fileReader.onload = e => this.onReaderLoad(e);
        fileReader.readAsText(file);
    }

    onChange() {
        if (this.input.files.length) {
            const file = this.input.files[0];
            this.handleInputSave(file);
        }
    }

    createWrapper() {
        const wrapper = document.createElement('div');
        wrapper.innerHTML = template;
        this.content = wrapper.querySelector('#content');
        this.input = wrapper.querySelector('input');
        this.input.setAttribute('accept',
            this.getAttribute('accept'));
        this.input.addEventListener('change',
            () => this.onChange());
        return wrapper;
    }
}

function initFilesInput() {
    customElements.define('files-input', FilesInput);
}

export {initFilesInput}
