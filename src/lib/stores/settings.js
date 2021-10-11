import {writable} from 'svelte/store';

export const darkmode = writable(localStorage.getItem('darkmode') || false);

darkmode.subscribe(v => localStorage.setItem('darkmode', v));