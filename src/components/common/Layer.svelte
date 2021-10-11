<script>
    import logo from 'assets/square_logo.webp';
    export let image = logo;
    export let classes = "";
    export let reverse = false;
</script>

<div class="outer {classes}">
    <div class="gutter flexbox spread center">
        {#if !reverse}
            <img src={image || logo} alt={image} />
            <div class="content">
                <slot></slot>
            </div>
        {:else}
            <div class="content">
                <slot></slot>
            </div>
            <img src={image || logo} alt={image} />
        {/if}
    </div>
</div>

<style>
    .outer {
        padding: 20px 0;
    }
    .content {
        max-width: 55%;
    }
</style>