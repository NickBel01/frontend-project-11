import { subscribe } from 'valtio/vanilla';
import i18next from 'i18next';
import state from './state.js';

const input = document.getElementById('url-input');

const renderError = (errorCode) => {
    input.classList.toggle('is-invalid', !!errorCode);
    const feedback = document.querySelector('.invalid-feedback');
    if (feedback) {
        feedback.textContent = errorCode ? i18next.t(`errors.${errorCode}`) : '';
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