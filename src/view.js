import { subscribe } from 'valtio/vanilla';
import state from './state.js';

const input = document.getElementById('url-input');

const renderError = (error) => {
    input.classList.toggle('is-invalid', !!error);
    const feedback = document.querySelector('.invalid-feedback');
    if (feedback) {
        feedback.textContent = error || '';
    }
};

export const initView = () => {
    subscribe(state, () => {
        renderError(state.form.error);
    });

    input.addEventListener('input', () => {
        state.form.url = input.value;
        state.form.error = null;
        input.classList.remove('is-invalid');
    });
};