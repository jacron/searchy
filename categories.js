const config = {
    IMDB: 'http://www.imdb.com/find?s=tt&q=',
        VARIETY:  'http://variety.com/results/#?q=',
        GOOGLE:  'https://google.nl/search?oq=',
        BOLCOM:  'https://www.bol.com/nl/rnwy/search.html?searchContext=books_all&searchtext=',
        BOEKWINKELTJES_SCHRIJVER:  'https://www.boekwinkeltjes.nl/su/?qs=',
        BOEKWINKELTJES_TITEL:  'https://www.boekwinkeltjes.nl/su/?qt=',
        GOOGLE_TORRENT:  'https://www.google.nl/search?q=torrent+',
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

export default [
    {
        name: "Films",
        en: "Movies",
        engines: [
            {
                name: "Avax",
                url: config.AVX_SEARCH,
            },
            {
                name: "IMDb",
                url: config.IMDB
            },
            {
                name: "Variety",
                url: config.VARIETY
            },
            {
                name: "YouTube",
                url: config.YOUTUBE
            },
            {
                name: "Criterion",
                url: config.CRITERION
            }
        ]
    },
    {
        name: "Torrents",
        engines: [
            {
                name: "Lime",
                url: config.LIME
            },
            {
                name: "Rarbg",
                url: config.RARBG
            },
            {
                name: "Google",
                url: config.GOOGLE_TORRENT
            },
            {
                name: "Your Bittorrent",
                url: config.YOURBITTORRENT
            }
        ]
    },
    {
        name: "nzb",
        engines: [
            {
                name: "NZBStars",
                url: config.STARSEARCH,
            },
            {
                name: "FindNZB",
                url: config.FINDNZB
            },
            {
                name: "NzbIndex",
                url: config.NZB_INDEX
            },
            {
                name: "Binsearch",
                url: config.BINSEARCH
            }
        ]
    },
    {
        name: "Algemeen",
        engines: [
            {
                name: "Google",
                url: config.GOOGLE,
            },

        ]
    },
    {
        name: "Boeken",
        engines: [
            {
                name: "Boekwinkeltjes (schrijver)",
                url: config.BOEKWINKELTJES_SCHRIJVER,
            },
            {
                name: "Boekwinkeltjes (titel)",
                url: config.BOEKWINKELTJES_TITEL
            },
            {
                name: "bol.com",
                url: config.BOLCOM
            }
        ],
    },
]
