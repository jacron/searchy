const templateEngine = `
<div class="dialog" id="dialogEngine">
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
        <button id="saveEngine">Save</button>
        <button id="cancelEngine">Cancel</button>
    </div>
</div>
`;

const templateCategory = `
<div class="dialog" id="dialogCategory">
    <div id="">Here comes the dialog Category...</div>
    <div class="cmds">
        <button id="saveCategory">Save</button>
        <button id="cancelCategory">Cancel</button>
    </div>
</div>
`;

function hideDialogs() {
    hideElement('dialogEngine');
    hideElement('dialogCategory');
    hideElement('dialogBackground');
}

function initBackground() {
    document.getElementById('dialogBackground')
        .removeEventListener('click', hideDialogs);
    document.getElementById('dialogBackground')
        .addEventListener('click', hideDialogs);
}

function saveEngine(id, target, cb) {
    const cmds = target.parentElement;
    const dialog = cmds.parentElement;
    const nameElement = dialog.querySelector('#engineName');
    const urlElement = dialog.querySelector('#engineUrl');
    const categoryElement = dialog.querySelector('#engineCategory');
    chrome.runtime.sendMessage({
        cmd: 'saveEngine',
        id: dialog.getAttribute('data-id'),
        name: nameElement.value,
        url: urlElement.value,
        categoryId: categoryElement.value
    }, response => {
        hideDialogs();
        cb({msg: 'changed'});
    })
}

function saveCategory(id, target, cb) {
    const cmds = target.parentElement;
    const dialog = cmds.parentElement;
    const nameElement = dialog.querySelector('#categoryName');
    chrome.runtime.sendMessage({
        cmd: 'saveCategory',
        id: dialog.getAttribute('data-id'),
        name: nameElement.value,
    }, response => {
        hideDialogs();
        cb({msg: 'changed'});
    })
}

function initEngineEvents(id, cb) {
    document.getElementById('saveEngine')
        .addEventListener('click', e => {
            saveEngine(id, e.target, cb);
        })
    document.getElementById('cancelEngine')
        .addEventListener('click', hideDialogs)
}

function dialogElementEngine(id, template, cb) {
    let dialogAction = document.getElementById(id);
    if (!dialogAction) {
        document.body.insertAdjacentHTML('beforeend', template);
        dialogAction = document.getElementById(id);
        initBackground();
        initEngineEvents(id, cb);
    }
    return dialogAction;
}

function initCategoryEvents(id, cb) {
    document.getElementById('saveCategory')
        .addEventListener('click', e => {
            saveCategory(id, e.target, cb);
        })
    document.getElementById('cancelCategory')
        .addEventListener('click', hideDialogs)
}

function dialogElementCategory(id, template, cb) {
    let dialogAction = document.getElementById(id);
    if (!dialogAction) {
        document.body.insertAdjacentHTML('beforeend', template);
        dialogAction = document.getElementById(id);
        // initBackground();
        initCategoryEvents(id, cb);
    }
    return dialogAction;
}

function showBackground() {
    document.getElementById('dialogBackground').style.display = 'block';
}

function initDialog(x, y, dialog) {
    showBackground();
    dialog.style.top = y + 'px';
    dialog.style.left = x + 'px';
    dialog.style.display = 'block';
}

function openDialogEngine(x, y, id, cb) {
    const dialogAction = dialogElementEngine('dialogEngine', templateEngine, cb);
    chrome.runtime.sendMessage({
        cmd: 'getEngineById', id
    }, response => {
        if (response) {
            const {engine, categories, category} = response;
            document.getElementById('dialogEngine')
                .setAttribute('data-id', engine.id);
            document.getElementById('engineName').value = engine.name;
            document.getElementById('engineUrl').value = engine.url;
            const categoriesElement = document.getElementById('engineCategory');
            categories.map(category => {
                const option = document.createElement('option');
                option.value = category.id;
                option.label = category.name;
                categoriesElement.appendChild(option);
            })
            categoriesElement.value = category.id;
        }
    })
    initDialog(x, y, dialogAction);
}

function openDialogCategory(x, y, id, cb) {
    const dialogAction = dialogElementCategory('dialogCategory', templateCategory, cb);
    initDialog(x, y, dialogAction);
}

function hideElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.style.display = 'none';
    }
}

export {openDialogEngine, openDialogCategory}
