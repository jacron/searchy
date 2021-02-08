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
<input autocomplete="off" spellcheck="false" type="search">
<type-ahead-list></type-ahead-list>
`;

export {template}
