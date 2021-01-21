const template = `
<style>
    .wrapper {
        display: inline-block;
        width: 100%;
    }
    input {
        background-color: %bgInput;
        font-size: 1.1em;
        color: %colInput;
        width: 100%;
        border: none;
    }
    input:focus {
        outline-width: 0;
    }
    .search-label {
        display: inline-block;
        width: 90px;
    }
</style>
<input type='search' id="search" autocomplete="off" autofocus>
<type-ahead-list></type-ahead-list>
`;

export {template}
