import {clearClass, setContextmenuTarget} from "./options.edit.js";

function enginesContextmenu(e) {
    setContextmenuTarget(e.target);
    clearClass('opened');
    const target = e.target;
    if (target.classList.contains('name')) {
        const category = target.closest('.category');
        if (category) {
            category.classList.add('opened');
            e.preventDefault();
        }
        const engine = target.closest('.engine');
        if (engine) {
            engine.classList.add('opened');
            e.preventDefault();
        }
    }
}

export {enginesContextmenu}
