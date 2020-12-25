const templateEngine = `
<div class="dialog" id="dialogEngine">
<div class="dialog-header" id="dialogEngineHeader">New engine</div>
<hr class="dialog-hr">
<div class="vert-spacer"></div>
<form id="formEngine">
        <div id="trim-controls">
            <button id="trim-title-1" title="title take one">1</button>
            <button id="trim-title-2" title="title take two">2</button>
            <button id="trim-title-1-2" title="restore title">1-2</button>
        </div>
    <div>
        <span class="label">Name</span>
        <input type="text" id="engineName" autofocus class="dialog-input">
    </div>
    <div>
        <span class="label">Url</span>
        <input type="text" id="engineUrl" class="dialog-input">
    </div>
    <div>
        <span class="label">Category</span>
        <select id="engineCategory"></select>
    </div>
    <div class="cmds">
        <input type="submit" value="Save">
        <button id="cancelEngine">Cancel</button>
    </div>
</form>
</div>
`;

const templateCategory = `
<div class="dialog" id="dialogCategory">
<div class="dialog-header" id="dialogCategoryHeader">New category</div>
<hr class="dialog-hr">
<div class="vert-spacer"></div>
<form id="formCategory">
    <div>
        <span class="label">Name</span>
        <input type="text" id="categoryName" autofocus class="dialog-input">
    </div>
    <div class="cmds">
        <input type="submit" value="Save">
        <button id="cancelCategory">Cancel</button>
    </div>
</form>
</div>
`;

const templateImport = `
<div class="dialog" id="dialogImport">
    <files-input accept="application/json" header="Read data"></files-input>
    <button class="fa fa-floppy-o" id="btnImportData"> Import</button>
</div>
`;

export {templateCategory, templateEngine, templateImport}
