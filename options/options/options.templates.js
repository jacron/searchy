function categoryHtml(category) {
    return `
<div class="category" data-id="${category.id}" draggable="true">
    <span class="visible">
        <input type="checkbox" title="visible on/off" 
        class="check-visible" ${category.visible ? 'checked' : ''}>
    </span>
    <span class="category-title name">${category.name}</span>
    <div class="controls">
        <div class="closer">x</div>
        <div class="cmd" cmd="edit">
            <span class="fa fa-edit" title="edit"></span>
            <span class="label">Edit</span>    
        </div>    
        <div class="cmd" cmd="change-color">
            <span class="fa fa-droplet" title="change color"></span>
            <span class="label">Change color</span>    
        </div>    
        <div class="cmd" cmd="delete">
            <span class="fa fa-delete" title="delete"></span>
            <span class="label">Delete</span>
        </div>
        <div class="cmd" cmd="add">
        <span class="fa fa-plus" title="add engine"></span>
            <span class="label">New engine</span>
        </div>
        <div class="cmd" cmd="export-group">
            <span class="fa fa-floppy-o" title="export group"></span>
            <span class="label">Export category</span>
        </div>
    </div>
</div>
`
}

function engineHtml(engine, defaultEngineId, faviconUrl) {
    const isDefault = engine.id === +defaultEngineId;
    const nameClass = isDefault ? 'default' : '';
    const disabled = isDefault ? 'disabled="true" ' : '';
    return `
<div class="engine" data-id="${engine.id}" data-url="${engine.url}">
    <img src="${faviconUrl}" class="icon" alt="i">
    <span class="visible">
        <input type="checkbox" title="visible on/off" 
        class="check-visible" ${engine.visible ? 'checked' : ''}>
    </span>
    <a data-href="${engine.url}" data-id="${engine.id}"
        class="name ${nameClass}" draggable="true">${engine.name}</a>
<!--    <span class="name ${nameClass}" draggable="true">${engine.name}</span>-->
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
