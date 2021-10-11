<script>
    import {darkmode} from 'lib/stores/settings';
    import Menu from './Menu';
    import Footer from './Footer';
</script>
<div class="outer" class:dm={$darkmode} class:lm={!$darkmode}>
    <div class="bg-bg fg-fg flexbox outer">
        <div>
            <Menu />
        </div>
        <div class="content">
            <slot></slot>
        </div>
        <div>
            <Footer />
        </div>
    </div>
</div>

<style>
    .outer {
        min-height: 100vh;
        width: 100vw;
    }
    .flexbox {
        flex-direction: column;
    }
    .content {
        flex-grow: 1;
    }
</style>