function isSelected(element) {
    return element.getAttribute('selected');
}

function nextRow(rows, typeAheadList) {
    if (isSelected(rows[rows.length -1])) {
        return false;
    } 
    let activeFound = false;
    for (let row of rows) {
        if (activeFound) {
            typeAheadList.moveSelector(row);
            typeAheadList.dispatchSetSearch(row.querySelector('.text').textContent);
            break;
        }
        if (isSelected(row)) {
            activeFound = true;
        }
    }
    if (!activeFound) {
        typeAheadList.moveSelector(rows[0]);
        typeAheadList.dispatchSetSearch(rows[0].querySelector('.text').textContent);
    }
    return true;
}

function prevRow(rows, typeAheadList) {
    if (isSelected(rows[0])) {
        console.log('in first row')
        return false;
    } else {
        let activeFound = false;
        for (let i = rows.length - 1; i > -1; i--) {
            const row = rows[i];
            if (activeFound) {
                typeAheadList.moveSelector(row);
                typeAheadList.dispatchSetSearch(row.querySelector('.text').textContent);
                break;
            }
            if (isSelected(row)) {
                activeFound = true;
            }
        }
        if (!activeFound) {
            const lastRow = rows[rows.length - 1];
            typeAheadList.moveSelector(lastRow);
            typeAheadList.dispatchSetSearch(lastRow.querySelector('.text').textContent);
        }
    }
    return true;
}

export {nextRow, prevRow}
