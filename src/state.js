import { proxy } from 'valtio/vanilla';

const state = proxy({
    feeds: [],
    posts: [],
    form: {
        url: '',
        error: null,
    },
});

export default state;