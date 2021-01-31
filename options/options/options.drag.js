import {bindToTypes} from "../../common/bind-events.js";
// import {showEngineLinks} from "./options.create.js";
import {moveCategory, moveEngine} from "./options.move.js";
import {notifysearchy} from "../../common/notifysearchy.js";

const draggedElementData = {
    id: '-1',
    type: '',
    name: '',
}

function dropItem(e) {
    const targetParent = e.target.closest('.item');
    if (targetParent) {
        e.preventDefault();
        moveCategory(draggedElementData.id, targetParent.getAttribute('data-id'));
        // showEngineLinks();
        notifysearchy();
    }
}

function dropEngine(e) {
    const targetParent = e.target.closest('.engine');
    if (targetParent) {
        e.preventDefault();
        moveEngine(draggedElementData.id, targetParent.getAttribute('data-id'));
        // showEngineLinks();
        notifysearchy();
    }
}

function clearDragged() {
    const draggedElement = document.querySelector('.dragged');
    if (draggedElement) {
        draggedElement.classList.remove('dragged');
    }
}

function onEnginesDrop(e) {
    if (draggedElementData.type === 'item') {
        dropItem(e);
    }
    if (draggedElementData.type === 'engine') {
        dropEngine(e);
    }
    clearDragged();
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
    const dataId = target.getAttribute('data-id');
    const type = target.classList.contains('item') ? 'item' :
        target.classList.contains('engine') ? 'engine' : '';
    draggedElementData.id = dataId;
    draggedElementData.type = type;
    target.classList.add('dragged');
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
