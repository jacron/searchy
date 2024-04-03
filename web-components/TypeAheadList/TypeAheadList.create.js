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

function createRow(obj, typeAheadList) {
    const title = document.createElement('div');
    title.className = 'title';
    title.tabIndex = -1;
    if (typeof  obj === 'string') {
        title.appendChild(createTextElement(obj));
    } else {
        title.setAttribute('id', obj.id);
        title.appendChild(createTextElement(obj.name));
    }
    title.style.backgroundColor = typeAheadList.colors.bgTitle;
    title.style.color = typeAheadList.colors.colTitle;
    if (typeAheadList.deletable !== 'false') {
        title.appendChild(createDeleteButton(typeAheadList));
    }
    return title;
}

export {createRow}
