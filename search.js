let term = "";

const IMDB = 'http://www.imdb.com/find?s=tt&q=';
const VARIETY = 'http://variety.com/results/#?q=';
const GOOGLE = 'https://google.nl/search?oq=';
const BOLCOM = 'https://www.bol.com/nl/rnwy/search.html?searchContext=books_all&searchtext=';
const BOEKWINKELTJES_SCHRIJVER = 'https://www.boekwinkeltjes.nl/su/?qs=';
const BOEKWINKELTJES_TITEL = 'https://www.boekwinkeltjes.nl/su/?qt=';
const GOOGLE_TORRENT = 'https://www.google.nl/search?q=torrent+';
const NZB_INDEX = 'http://www.nzbindex.nl/search?sort=sizedesc&q=';
const AVX_SEARCH = 'https://tavaz.xyz/search/?category_slug=video&query=';
const YOURBITTORRENT = 'https://yourbittorrent.com/?q=';
const SUBSCENE = 'http://subscene.com/subtitles/title?q=';
const SUBS = 'http://google.nl/search?q=subtitles+';
const OPENSUBS = 'http://www.opensubtitles.org/en/search2/sublanguageid-dut,eng,fre/moviename-';
const RARBG = 'https://rarbg.to/torrents.php?search=';
const LIME = 'https://www.limetorrents.info/search/all/';
const FINDNZB = 'http://findnzb.net/?limit=25&sort=largest&q=';
const BINSEARCH = 'https://www.binsearch.info/?q=';
const STARSEARCH = 'https://nzbstars.com/?sortdir=ASC&sortby=&search%5Bvalue%5D%5B%5D=Title%3A%3D%3ADEF%3A';
const INURL = GOOGLE + '-inurl:(htm|html|php) intitle:"index of"  "last modified"   (jpg|JPG) ';
const YOUTUBE = 'https://www.youtube.com/results?search_query=';
const CRITERION = 'https://www.criterion.com/search#stq=';

const catagories = [
    {
        id: 1,
        nl: "Films",
        en: "Movies",
        engines: [
            {
                name: "Avax",
                url: AVX_SEARCH,
            },
            {
                name: "IMDb",
                url: IMDB
            },
            {
                name: "Variety",
                url: VARIETY
            },
            {
                name: "YouTube",
                url: YOUTUBE
            },
            {
                name: "Criterion",
                url: CRITERION
            }
        ]
    },
    {
        id: 3,
        nl: "Torrent",
        en: "Torrent",
        engines: [
            {
                name: "Lime",
                url: "https://www.limetorrents.info/search/all/",
            },
            {
                name: "Rarbg",
                url: "https://rarbg.to/torrents.php?search="
            }
        ]
    },
    {
        id: 4,
        nl: "nzb",
        en: "nzb",
        engines: [
            {
                name: "NZBStars",
                url: STARSEARCH,
            },
            {
                name: "FindNZB",
                url: FINDNZB
            },
            {
                name: "NzbIndex",
                url: NZB_INDEX
            }
        ]
    },
    {
        id: 5,
        nl: "Algemeen",
        en: "General",
        engines: [
            {
                name: "Lime",
                url: "https://www.limetorrents.info/search/all/",
            },

        ]
    },
    {
        id: 2,
        nl: "Boeken",
        en: "Books",
        engines: [
            {
                name: "Boekwinkeltjes (schrijver)",
                url: BOEKWINKELTJES_SCHRIJVER,
            },
            {
                name: "Boekwinkeltjes (titel)",
                url: BOEKWINKELTJES_TITEL
            },
            {
                name: "bol.com",
                url: BOLCOM
            }
        ],
        // columnBreak: true
    },
]

function getSearchTermFromBackground() {
    chrome.runtime.sendMessage({cmd: "getSelectedTerm"},
            response => {
        term = response.term;
        document.getElementById("term").value = term;
    })
}

function displayEngines() {
    catagories.map(category => {
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'item';
        let html = `<div class="category-title">${category.nl}</div>`;
        category.engines.map(engine => {
            html += `<div class="engine"><a>${engine.name}</a></div>`;
        })
        categoryDiv.innerHTML = html;
        document.getElementById('engines').appendChild(categoryDiv);
        if (category.columnBreak) {
            const breakElement = document.createElement('span');
            breakElement.className = 'column-break';
            document.getElementById('engines').appendChild(breakElement);
        }
    })
}

function init() {
    getSearchTermFromBackground();
    displayEngines();
}

init();
