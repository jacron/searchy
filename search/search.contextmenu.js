import {openContextmenuEngines, initSingletonContextmenuEngines} from "./contextmenu.engine.js";
import {initSingletonContextmenuCategories, openContextmenuCategories} from "./contextmenu.category.js";

function enginesContextmenu(e) {
    const target = e.target;
    if (target.tagName === 'A') {
        initSingletonContextmenuEngines();
        openContextmenuEngines(e);
    }
    if (target.classList.contains('category-title')) {
        initSingletonContextmenuCategories();
        openContextmenuCategories(e);
    }
    e.preventDefault();
}

export {enginesContextmenu}
