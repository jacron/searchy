function createTextElement(obj) {
    const text = document.createElement('span');
    text.textContent = obj;
    text.className = 'text';
    return text;
}

function deleteHandler(e, typeAheadList) {
    const target = e.target;
    const item = target.parentElement
        .querySelector('.text');
    typeAheadList.dispatchDelete(item);
}

function createDeleteButton(typeAheadList) {
    const deleteButton = document.createElement('div');
    deleteButton.textContent = 'x';
    deleteButton.className = 'btn-delete';
    deleteButton.addEventListener('click', e => {
        deleteHandler(e, typeAheadList)
    });
    return deleteButton;
}

function selectHandler(name, typeAheadList) {
    console.log(name)
    typeAheadList.dispatchSearchSave(name);
    typeAheadList.dispatchSearchFocus();
    typeAheadList.closeList();
}

function createRow(obj, typeAheadList) {
    const row = document.createElement('div');
    row.className = 'title';
    row.tabIndex = -1;
    let name;
    if (typeof obj === 'string') {
        row.appendChild(createTextElement(obj));
        name = obj;
    } else {
        row.setAttribute('id', obj.id);
        row.appendChild(createTextElement(obj.name));
        name= obj.name;
    }
    row.style.backgroundColor = typeAheadList.colors.bgTitle;
    row.style.color = typeAheadList.colors.colTitle;
    if (typeAheadList.deletable !== 'false') {
        row.appendChild(createDeleteButton(typeAheadList));
    }
    row.addEventListener('click', e => {
        selectHandler(name, typeAheadList);
    })
    return row;
}

export {createRow}
