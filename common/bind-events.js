function bindToElements(type, bindings) {
    for (const [id, listener] of bindings) {
        const element = document.getElementById(id);
        if (!element) {
            console.error('id does not exist: ', id);
            console.trace();
        } else {
            element.addEventListener(type, listener);
        }
    }
}

// function bindTypeToElements(bindings) {
//     for (const [id, type, listener] of bindings) {
//         const element = document.getElementById(id);
//         if (!element) {
//             console.error('id does not exist', id);
//             console.trace();
//         } else {
//             element.addEventListener(type, listener);
//         }
//     }
// }

function bindToTypes(bindings, element) {
    for (const [type, listener] of bindings) {
        element.addEventListener(type, listener);
    }
}

// function bindKeys(key, keyjumps) {
//     for (const [code, fun] of keyjumps) {
//         if (key === code) { fun() }
//     }
// }

export {bindToElements, bindToTypes}
