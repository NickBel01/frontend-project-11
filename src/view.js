const input = document.getElementById('url-input');

export const renderError = (error) => {
    input.classList.toggle('is-invalid', !!error);
    const feedback = document.querySelector('.invalid-feedback');
    if (feedback) {
        feedback.textContent = error || '';
    }
};