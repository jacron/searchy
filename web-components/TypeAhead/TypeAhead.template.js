const template = `
<style>
    .wrapper {
        display: inline-block;
        width: 100%;
    }
    input {
        font-size: 1.1em;
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
<input id="search" autocomplete="off" autofocus spellcheck="false">
<type-ahead-list
></type-ahead-list>
`;

export {template}