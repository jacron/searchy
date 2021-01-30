import {bindToTypes} from "../../common/bind-events.js";
import {showEngineLinks} from "./options.create.js";
import {moveCategory} from "./options.move.js";

const draggedElementData = {
    id: '-1',
    type: '',
    name: '',
    // nameFromDragstart: e => {
    //     const titleElement = e.target.querySelector('.category-title');
    //     if (titleElement) {
    //         this.name = titleElement.textContent;
    //     }
    //     const nameElement = e.target.querySelector('.name');
    //     if (nameElement) {
    //         this.name = nameElement.textContent;
    //     }
    // }
}

function dropItem(e) {
    const targetParent = e.target.closest('.item');
    if (targetParent && targetParent.getAttribute('data-id') !== draggedElementData.id) {
        e.preventDefault();
        moveCategory(draggedElementData.id, targetParent.getAttribute('data-id'));
        showEngineLinks();
    }
}

function dropEngine(e) {
    console.log(e.target);
}

function onEnginesDrop(e) {
    if (draggedElementData.type === 'item') {
        dropItem(e);
    }
    if (draggedElementData.type === 'engine') {
        dropEngine(e);
    }
}

function itemDragover(e) {
    const targetParent = e.target.closest('.item');
    if (targetParent && targetParent.getAttribute('data-id') !== draggedElementData.id) {
        targetParent.classList.add('dragover');
        e.preventDefault();
    }
}

function engineDragover(e) {
    const targetParent = e.target.closest('.engine');
    if (targetParent && targetParent.getAttribute('data-id') !== draggedElementData.id) {
        targetParent.classList.add('dragover');
        e.preventDefault();
    }
}

function onEnginesDragover(e) {
        if (draggedElementData.type === 'item') {
            itemDragover(e);
        }
        if (draggedElementData.type === 'engine') {
            engineDragover(e);
        }
}

function onEnginesDragleave(e) {
    if (draggedElementData.type === 'item') {
        const targetParent = e.target.closest('.item')
        if (targetParent) {
            targetParent.classList.remove('dragover');
        }
    }
    if (draggedElementData.type === 'engine') {
        const targetParent = e.target.closest('.engine');
        if (targetParent) {
            targetParent.classList.remove('dragover');
        }
    }
}

function getSourceDataOnDragstart(e) {
    const target = e.target;
    console.log(target);
    const dataId = target.getAttribute('data-id');
    const type = target.classList.contains('item') ? 'item' :
        target.classList.contains('engine') ? 'engine' : '';
    draggedElementData.id = dataId;
    draggedElementData.type = type;
    // draggedElementData.nameFromDragstart(e);
    return type + '-' + dataId;
}

function onEnginesDragstart(e) {
    const data = getSourceDataOnDragstart(e);
    e.dataTransfer.setData('text', data);
    e.dataTransfer.effectAllowed = 'move';
}

function initEnginesDragDropEvents() {
    const engines = document.getElementById('engines');
    bindToTypes([
        ['drop', onEnginesDrop],
        ['dragover', onEnginesDragover],
        ['dragleave', onEnginesDragleave],
        ['dragstart', onEnginesDragstart],
    ], engines);
}

export {initEnginesDragDropEvents}
