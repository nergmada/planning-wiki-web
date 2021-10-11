import Index from './Index.svelte';
import 'styles/global.sass';

const app = new Index({
    target: document.body,
});

window.app = app;

export default app;