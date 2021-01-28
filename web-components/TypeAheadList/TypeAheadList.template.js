const template = `
<style>
    .wrapper {
        width: 100%;
    }
    .slist {
        line-height: 2;
        position: absolute;
        width: 288px;
        box-shadow: 0 6px 12px 3px rgba(0, 0, 0, 0.24);
        margin-top: 12px;
        visibility: hidden;
    }
    .title {
        border: 1px solid #444444;
        padding: 3px 12px;
    }
    .title:focus {
        outline-width: 0;
    }
    .btn-delete {
        float: right;
        visibility: hidden;
        padding: 0 7px;
        cursor: pointer;
    }
    .btn-delete:hover {
        background-color: #557;    
    }
</style>
<div class="slist" tabindex="-1"></div>
`;

export {template}
