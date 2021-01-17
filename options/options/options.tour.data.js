const advices = [
    {
        element: () => document.getElementById('toHome'),
        header: 'Home',
        message: 'Go back to the search page.',
        offsetLeft: -90,
        offsetTop: 40,
        bubbleSlideLeft: 1,
    },
    {
        element: () => {
            const titles = document.querySelectorAll('.category-title');
            return titles[0];
        },
        header: 'Group Header',
        message: 'Hover to edit, remove or export this group, or add an engine to it',
        offsetLeft: 60,
        offsetTop: 48,
    },
    {
        element: () => {
            const titles = document.querySelectorAll('.engine');
            return titles[0];
        },
        header: 'Engine',
        message: 'Hover to edit, jump to, remove, or flag this engine. \nFlag means setting it to default.',
        offsetLeft: 80,
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
        element: () => document.getElementById('toggleDark'),
        header: 'Toggle Dark',
        message: 'Turn dark mode on/off.',
        offsetLeft: -15,
        offsetTop: 40
    },
    {
        element: () => document.getElementById('help'),
        header: 'Help',
        message: 'Repeat this help tour.',
        offsetLeft: -90,
        offsetTop: 40,
        bubbleSlideLeft: true
    }
];

export {advices}
