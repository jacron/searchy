import {clearClass} from "./options.edit.js";

function enginesContextmenu(e) {
    clearClass('opened');
    if (e.target.classList.contains('name')) {
        const category = e.target.closest('.category');
        if (category) {
            category.classList.add('opened');
            e.preventDefault();
        }
        const engine = e.target.closest('.engine');
        if (engine) {
            engine.classList.add('opened');
            e.preventDefault();
        }
    }
}

export {enginesContextmenu}
