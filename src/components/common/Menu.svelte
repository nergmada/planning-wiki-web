<script>
    import InlineSVG from 'svelte-inline-svg';

    import {darkmode} from 'lib/stores/settings';
    import menuItems from 'lib/config/menu';
    import dm_logo from 'assets/logo_long_white_text.webp';
    import lm_logo from 'assets/logo_long_black_text.webp';
    import moon from 'assets/icons/moon.svg';

    import Switch from './Switch';
</script>

<div class="outer">
    <div class="gutter flexbox spread">
        <img src={$darkmode ? dm_logo : lm_logo} alt="logo" />
        <div class="menu flexbox spread center">
            {#each menuItems as item}
                <a href={item.link}>{item.label}</a>
            {/each}
            <div class="switch" class:bg-bg={!$darkmode} class:on={$darkmode}>
                <InlineSVG src={moon} width={30} height={30} />
                <Switch bind:checked={$darkmode} />
            </div>
        </div>
    </div>
</div>

<style>
    .outer, .gutter {
        height: 100px;
    }
    img {
        max-width:100%;
        max-height:100%
    }
    .menu {
        display: inline-flex;
        width: 65%;
    }
    .switch {
        padding-right: 80px;
    }
    .on {
        color: #ffc400;
    }
</style>