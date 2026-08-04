import { proxy } from 'valtio/vanilla';

const state = proxy({
    feeds: [],
    posts: [],
    readPosts: new Set(),
    modal: {
        show: false,
        post: null,
    },
    form: {
        url: '',
        error: null,
        status: 'filling',
    },
});

export default state;