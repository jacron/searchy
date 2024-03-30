const advices = [
    {
        element: () => document.getElementById('toggleDark'),
        header: 'Omnibox',
        message: "In the omnibox, type 'sy ' to use Searchy for searching.",
        offsetTop: 10,
        offsetLeft: -260
    },
    {
        element: () => document.getElementById('pageOptions'),
        header: 'Options',
        message: 'Add or change your search engines for Searchy.',
        offsetLeft: -90,
        offsetTop: 40,
        bubbleSlideLeft: true,
    },
    {
        element: () => document.getElementById('newTab'),
        header: 'Open in new Tab',
        message: 'Check this to open each engine in a new tab.',
        offsetLeft: -15,
        offsetTop: 40
    },
    {
        element: () => document.getElementById('toggleDark'),
        header: 'Toggle Dark',
        message: 'Turn dark mode on/off.',
        offsetLeft: -15,
        offsetTop: 40
    },
    {
        element: () => document.getElementById('toggleRecent'),
        header: 'Toggle Recent',
        message: 'Recently used search terms display on/off.',
        offsetLeft: -15,
        offsetTop: 40,
    },
    {
        element: () => document.getElementById('help'),
        header: 'Help',
        message: 'Repeat this help tour.',
        offsetLeft: -90,
        offsetTop: 40,
        bubbleSlideLeft: true
    },
];

export {advices}
