import * as yup from 'yup';
import initI18n from './locales/index.js';
import state from './state.js';
import { initView } from './view.js';
import { validateUrl } from './utils/validate.js';
import loadFeed from './api.js';

initI18n().then(() => {
    yup.setLocale({
        mixed: {
            required: 'required',
            notOneOf: 'duplicate',
        },
        string: {
            url: 'invalidUrl',
        },
    });

    initView();

    const form = document.getElementById('rss-form');
    const input = document.getElementById('url-input');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const url = state.form.url;

        validateUrl(url, state.feeds.map((feed) => feed.url))
            .then(() => loadFeed(url))
            .then(({ feed, posts }) => {
                state.feeds.push({
                    url,
                    ...feed,
                });

                state.posts.push(...posts);

                state.form.url = '';
                state.form.error = null;

                input.value = '';
                input.classList.remove('is-invalid');
                input.focus();
            })
            .catch((err) => {
                state.form.error = err.message;
            });
    });
});