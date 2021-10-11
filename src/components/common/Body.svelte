<script>
    import MarkdownIt from 'markdown-it';
    const md = new MarkdownIt({
        html: true
    });
    
    export let text = "";
</script>
<div class="text-body medium-font">
    {@html md.render(text ? text : "")}
</div>
{#if text !== ""}
    <style>
        .text-body img {
            width: 50% !important;
            display: inline-block;
        }
        .text-body  p {
            display: inline-block;
        }
        .text-body blockquote {
            word-break: break-word;
        }
        tr, tbody, thead {
            border: 1px solid #111;
        }
    </style>
{/if}