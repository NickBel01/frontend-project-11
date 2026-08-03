import { proxy } from 'valtio/vanilla';

const state = proxy({
    feeds: [],
    form: {
        url: '',
        error: null,
    },
});

export default state;