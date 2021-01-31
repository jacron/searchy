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
        <span class="closer">x</span>
    </span>
</div>
`
}

function engineHtml(engine, defaultEngineId) {
    const isDefault = engine.id === +defaultEngineId;
    const nameClass = isDefault ? 'default' : '';
    const disabled = isDefault ? 'disabled="true" ' : '';
    return `
<div class="engine" data-id="${engine.id}" draggable="true"
    data-url="${engine.url}">
    <span class="visible">
        <input type="checkbox" title="visible on/off" 
        class="check-visible" ${engine.visible ? 'checked' : ''}>
    </span>
    <span class="name ${nameClass}">${engine.name}</span>
    <div class="controls">
        <div class="closer">x</div>
        <div class="cmd" cmd="edit">
            <span class="fa fa-edit" title="edit"></span>    
            <span class="label">Edit</span>    
        </div>
        <div class="cmd" cmd="link">
            <span class="fa fa-external-link" title="link"></span>    
            <span class="label">Open url</span>
        </div>
        <div class="cmd" cmd="delete">
            <span class="fa fa-delete" title="delete"></span>
            <span class="label">Delete</span>
        </div>
        <div class="cmd" cmd="set-default">
            <span class="fa fa-flag" ${disabled} title="set default"></span>
            <span class="label">Set default</span>
        </div>
    </div>
</div>
`;
}

export {categoryHtml, engineHtml}
