<script>
    export let checked = true;
</script>

<span class="outer" class:bg-active-1={checked} class:bg-fg={!checked} on:click={() => checked = !checked}>
    <span class="inner" style="transform: translate({checked ? 30 : 5}px, 2px)">
    </span>
</span>

<style>
    .outer {
        position: absolute;
        width: 60px;
        height: 30px;
        border-radius: 15px;
        margin-left: 10px;
    }
    .inner {
        width: 25px;
        height: 25px;
        border-radius: 12.5px;
        background-color: rgb(230, 230, 230);
        position: absolute;
    }
</style>