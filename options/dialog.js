const template = `
<div class="dialog" id="dialogAction">
<div>Here comes the dialog...</div>
</div>
`;

function openDialog(x, y) {
    // console.log(x, y);
    const dialogElementId = 'dialogAction';
    let dialogAction = document.getElementById(dialogElementId);
    if (!dialogAction) {
        document.body.insertAdjacentHTML('beforeend', template);
        dialogAction = document.getElementById(dialogElementId);
    }
    dialogAction.style.top = y + 'px';
    dialogAction.style.left = x + 'px';
    dialogAction.style.display = 'block';
    // console.log(dialogAction);
}

export {openDialog}
