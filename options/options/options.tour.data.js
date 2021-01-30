function firstCategoryTitle() {
    return document.querySelectorAll('.category-title')[0];
}

function firstEngineTitle() {
    return document.querySelectorAll('.engine')[0];
}

const advices = [
    {
        element: firstCategoryTitle,
        header: 'Group Header',
        message: 'Hover to edit, remove or export this group, or add an engine to it.',
        offsetLeft: 60,
        offsetTop: 48,
    },
    {
        element: firstEngineTitle,
        header: 'Engine',
        message: 'Hover to edit, jump to, remove, or flag this engine. \nFlag means: setting it to default.',
        offsetLeft: 100,
        offsetTop: 40,
        bubbleSlideLeft: -1,
    },
    {
        element: () => {
            const checkboxes = document.querySelectorAll('.check-visible')
            return checkboxes[0];
        },
        header: 'Display an engine',
        message: 'Uncheck  to hide the engine on the search page.',
        offsetLeft: 56,
        offsetTop: 40,
        bubbleSlideLeft: -1,
    },
    {
        element: () => document.getElementById('addEngine'),
        header: 'Add Engine',
        message: 'Add a new engine to one of the groups of Searchy.',
        offsetLeft: 80,
        offsetTop: 40,
        bubbleSlideLeft: 1
    },
    {
        element: () => document.getElementById('addCategory'),
        header: 'Add Category',
        message: 'Add a new group.',
        offsetLeft: 0,
        offsetTop: 40,
    },
    {
        element: () => document.getElementById('exportData'),
        header: 'Export Data',
        message: 'Export all engines and groups to a json file.',
        offsetLeft: -10,
        offsetTop: 40,
    },
    {
        element: () => document.getElementById('importData'),
        header: 'Import Data',
        message: 'Import all engines and groups from a json file.',
        offsetLeft: -10,
        offsetTop: 40,
    },
    {
        element: firstCategoryTitle,
        header: 'Drag and drop',
        message: 'You can drag a category to another position',
        offsetLeft: 60,
        offsetTop: 48,

    },
    {
        element: firstEngineTitle,
        header: 'Drag and drop',
        message: 'You can drag an engine to another position and/or another category',
        offsetLeft: 100,
        offsetTop: 40,
        bubbleSlideLeft: -1,
    },
    {
        element: () => document.getElementById('toHome'),
        header: 'Home',
        message: 'Go back to the search page.',
        offsetLeft: 0,
        offsetTop: 40,
    },
    {
        element: () => document.getElementById('help'),
        header: 'Help',
        message: 'Repeat this help tour.',
        offsetLeft: -10,
        offsetTop: 40,
    }
];

export {advices}
