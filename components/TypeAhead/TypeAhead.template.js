const template = `
<style>
    input {
        background-color: %bgInput;
        font-size: 20px;
        color: %colInput;
    }
    .search-label {
        display: inline-block;
        width: 90px;
    }
    .slist {
        line-height: 2;
        margin: 0 0 12px 96px;
        position: absolute;
        min-width: 215px;
        box-shadow: 0 6px 12px 3px rgba(0, 0, 0, 0.24);
    }
    .title {
        border: 1px solid #444444;
        background-color: %bgTitle;
        color: %colTitle;
        padding: 3px 12px;
    }
</style>
<span class="search-label"></span>
<input type='search' id="search" autocomplete="off">
<div class="slist" tabindex="-1"></div>
`;

export {template}
