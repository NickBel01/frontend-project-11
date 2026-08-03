import state from './state.js';
import { initView } from './view.js';
import { validateUrl } from './utils/validate.js';

initView();

const form = document.getElementById('rss-form');
const input = document.getElementById('url-input');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const url = state.form.url;

    validateUrl(url, state.feeds)
        .then(() => {
            state.feeds.push(url);
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