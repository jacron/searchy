const templateEngine = `
<div class="dialog" id="dialogEngine">
<form id="formEngine">
    <div>
        <span class="label">Name</span>
        <input type="text" id="engineName">
    </div>
    <div>
        <span class="label">Url</span>
        <input type="text" id="engineUrl">
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
<form id="formCategory">
    <div>
        <span class="label">Name</span>
        <input type="text" id="categoryName">
    </div>
    <div class="cmds">
        <input type="submit" value="Save">
        <button id="cancelCategory">Cancel</button>
    </div>
</form>
</div>
`;

export {templateCategory, templateEngine}
