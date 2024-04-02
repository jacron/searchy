const templateEngineDialog = `
<div class="dialog" id="dialogEngine">
    <div class="dialog-header" id="dialogEngineHeader">New engine</div>
    <hr class="dialog-hr">
    <div class="vert-spacer"></div>
    <div class="dialog-form">
        <div id="trim-controls">
            <button id="trim-title-1" title="title take one">1</button>
            <button id="trim-title-2" title="title take two">2</button>
            <button id="trim-title-1-2" title="restore title">1-2</button>
        </div>
        <div>
            <span class="label">Name</span>
            <input type="text" id="engineName" autocomplete="off" class="dialog-input">
        </div>
        <div>
            <span class="label">Url</span>
            <input type="text" id="engineUrl" class="dialog-input" autocomplete="off">
        </div>
        <div>
            <span class="label">Category</span>
            <select id="engineCategory"></select>
        </div>
        <div class="cmds">
            <button id="saveEngine">Save</button>
            <button id="cancelEngine">Cancel</button>
        </div>
    </div>
</div>
`;

export {templateEngineDialog}
