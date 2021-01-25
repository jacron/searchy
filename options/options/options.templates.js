function categoryHtml(category) {
    return `
<div class="category" data-id="${category.id}">
    <span class="category-title name">${category.name}</span>
    <span class="controls">
        <span>&nbsp;</span>
        <span class="fa fa-edit edit cat" title="edit"></span>    
        <span class="fa fa-delete delete cat" title="delete"></span>
        <span class="fa fa-plus add cat" title="add engine"></span>
        <span class="fa fa-floppy-o export-group cat" title="export group"></span>
    </span>
</div>
`
}

function engineHtml(engine, defaultEngineId) {
    const isDefault = engine.id === +defaultEngineId;
    const nameClass = isDefault ? 'default' : '';
    const disabled = isDefault ? 'disabled="true" ' : '';
    return `
<div class="engine" data-id="${engine.id}" data-url="${engine.url}">
    <span class="visible">
        <input type="checkbox" title="visible on/off" 
        class="check-visible" ${engine.visible ? 'checked' : ''}>
    </span>
    <span class="name ${nameClass}">${engine.name}</span>
    <span class="controls">
        <span class="fa fa-edit edit eng" title="edit"></span>    
        <span class="fa fa-external-link link eng" title="link"></span>    
        <span class="fa fa-delete delete eng" title="delete"></span>
        <span class="fa fa-flag set-default eng" ${disabled} title="set default"></span>
    </span>
</div>
`;
}

export {categoryHtml, engineHtml}
