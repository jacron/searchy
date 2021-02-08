const config = {
    IMDB: 'http://www.imdb.com/find?s=tt&q=',
    VARIETY:  'http://variety.com/results/#?q=',
    GOOGLE:  'https://www.google.nl/search?q=',
    GOOGLE_TORRENT:  'https://www.google.nl/search?q=torrent+',
    BOLCOM:  'https://www.bol.com/nl/rnwy/search.html?searchContext=books_all&searchtext=',
    BOEKWINKELTJES_SCHRIJVER:  'https://www.boekwinkeltjes.nl/su/?qs=',
    BOEKWINKELTJES_TITEL:  'https://www.boekwinkeltjes.nl/su/?qt=',
    NZB_INDEX:  'http://www.nzbindex.nl/search?sort=sizedesc&q=',
    AVX_SEARCH:  'https://tavaz.xyz/search/?category_slug=video&query=',
    YOURBITTORRENT:  'https://yourbittorrent.com/?q=',
    RARBG:  'https://rarbg.to/torrents.php?search=',
    LIME:  'https://www.limetorrents.info/search/all/',
    FINDNZB:  'http://findnzb.net/?limit=25&sort=largest&q=',
    BINSEARCH:  'https://www.binsearch.info/?q=',
    STARSEARCH:  'https://nzbstars.com/?sortdir=ASC&sortby=&search%5Bvalue%5D%5B%5D=Title%3A%3D%3ADEF%3A',
    YOUTUBE:  'https://www.youtube.com/results?search_query=',
    CRITERION:  'https://www.criterion.com/search#stq='
};

const FilmsEngines = [
    {
        name: "Avax",
        url: config.AVX_SEARCH,
        visible: true,
        id: 1
    },
    {
        name: "IMDb",
        url: config.IMDB,
        visible: true,
        id: 2
    },
    {
        name: "Variety",
        url: config.VARIETY,
        visible: true,
        id: 3
    },
    {
        name: "YouTube",
        url: config.YOUTUBE,
        visible: true,
        id: 4
    },
    {
        name: "Criterion",
        url: config.CRITERION,
        visible: true,
        id: 5
    }
];

// const TorrentsEngines = [
//     {
//         name: "Lime",
//         url: config.LIME,
//         visible: true,
//         id: 6
//     },
//     {
//         name: "Rarbg",
//         url: config.RARBG,
//         visible: true,
//         id: 7
//     },
//     {
//         name: "Google",
//         url: config.GOOGLE_TORRENT,
//         visible: true,
//         id: 8
//     },
//     {
//         name: "Your Bittorrent",
//         url: config.YOURBITTORRENT,
//         visible: true,
//         id: 9
//     }
// ];
//
// const NzbEngines = [
//     {
//         name: "NZBStars",
//         url: config.STARSEARCH,
//         visible: true,
//         id: 10
//     },
//     {
//         name: "FindNZB",
//         url: config.FINDNZB,
//         visible: true,
//         id: 11
//     },
//     {
//         name: "NzbIndex",
//         url: config.NZB_INDEX,
//         visible: true,
//         id: 12
//     },
//     {
//         name: "Binsearch",
//         url: config.BINSEARCH,
//         visible: true,
//         id: 13
//     }
// ];

const AlgemeenEngines = [
    {
        name: "Google",
        url: config.GOOGLE,
        visible: true,
        id: 14
    },
];

const BoekenEngines = [
    {
        name: "Boekwinkeltjes (schrijver)",
        url: config.BOEKWINKELTJES_SCHRIJVER,
        visible: true,
        id: 15
    },
    {
        name: "Boekwinkeltjes (titel)",
        url: config.BOEKWINKELTJES_TITEL,
        visible: true,
        id: 16
    },
    {
        name: "bol.com",
        url: config.BOLCOM,
        visible: true,
        id: 17
    }
];

const categories = [
    {
        name: "Algemeen",
        id: 4,
        engines: AlgemeenEngines
    },
    {
        name: "Films",
        id: 1,
        engines: FilmsEngines
    },
    {
        name: "Boeken",
        id: 5,
        engines: BoekenEngines,
    },
    /*
    {
        name: "Torrents",
        id: 2,
        engines: TorrentsEngines
    },
    {
        name: "nzb",
        id: 3,
        engines: NzbEngines
    },
     */
]

export {categories}
