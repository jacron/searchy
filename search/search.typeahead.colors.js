const menuColors = {
    bgInput: '#fff',
    colInput: '#333',
    bgTitle: '#fff',
    colTitle: '#333',
    bgSelected: '#eee'
}

const menuColorsDark = {
    bgInput: '#111',
    colInput: '#ccc',
    bgTitle: '#292a2d',
    colTitle: '#eee',
    bgSelected: '#4b4c4f'
}

function getTypeaheadColors(darkmode) {
    return darkmode ? menuColorsDark : menuColors;
}

export {getTypeaheadColors}
