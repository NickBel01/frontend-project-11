import state from './state.js';
import { renderError } from './view.js';
import { validateUrl } from './utils/validate.js';

const form = document.getElementById('rss-form');
const input = document.getElementById('url-input');

input.addEventListener('input', () => {
    state.form.url = input.value;
    state.form.error = null;
    renderError(null);
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const url = state.form.url;

    validateUrl(url, state.feeds)
        .then(() => {
            state.feeds.push(url);
            state.form.url = '';
            state.form.error = null;
            input.value = '';
            renderError(null);
            input.focus();
        })
        .catch((err) => {
            state.form.error = err.message;
            renderError(err.message);
        });
});