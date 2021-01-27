class ColorPicker {
    constructor() {
        this.dialog = this.createDialog();
    }

    setDialogStyle(options) {
        Object.keys(options).forEach(key => {
            this.dialog.style[key] = options[key];
        });
    }

    openDialog(e, color) {
        if (color) {
            this.input.value = color;
        } else {
            this.input.value = null;
        }
        const target = e.target;
        this.setDialogStyle({
            visibility: 'visible',
            left: target.offsetLeft + 'px',
            top: target.offsetTop + 'px',
        });
    }

    closeDialog() {
        this.dialog.style.visibility = 'hidden';
    }

    handleOkay() {
        this.closeDialog();
        this.dialog.dispatchEvent(new CustomEvent('select', {
            detail: this.input.value
        }));
    }

    createDialog() {
        const dialog = document.createElement('div');
        dialog.className = 'dialog-color'
        dialog.innerHTML = `
<style>
    .dialog-color {
        background-color: inherit;
        top: 0;     
        border-radius: 0 0 6px 6px;
        border: 1px solid #999;
        padding: 6px;   
        position: absolute;
        line-height: 2;
    }
</style>
<div style="text-align: center; margin-bottom: 12px">
    <input type="color">
</div>
<div>
    <button id="cancelColorDialog">Cancel</button>
    <button id="okayColorDialog">OK</button>
</div>
`;
        this.input = dialog.querySelector('input');
        document.body.appendChild(dialog);
        dialog.querySelector('#cancelColorDialog')
            .addEventListener('click', this.closeDialog.bind(this));
        dialog.querySelector('#okayColorDialog')
            .addEventListener('click', this.handleOkay.bind(this))
        return dialog;
    }
}

export {ColorPicker}
