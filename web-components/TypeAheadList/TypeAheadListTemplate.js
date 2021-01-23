const template = `
<style>
    .wrapper {
        width: 100%;
    }
    .slist {
        line-height: 2;
        position: absolute;
        min-width: 215px;
        box-shadow: 0 6px 12px 3px rgba(0, 0, 0, 0.24);
        margin-top: 12px;
    }
    .title {
        border: 1px solid #444444;
        padding: 3px 12px;
    }
    .title:focus {
        outline-width: 0;
    }
</style>
<div class="slist" tabindex="-1"></div>
`;

export {template}