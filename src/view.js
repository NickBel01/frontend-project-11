import { subscribe } from 'valtio/vanilla';
import i18next from 'i18next';
import state from './state.js';

const input = document.getElementById('url-input');
const feedsContainer = document.getElementById('feeds');
const postsContainer = document.getElementById('posts');
const modalContainer = document.getElementById('modal');

const renderError = (errorCode) => {
    input.classList.toggle('is-invalid', Boolean(errorCode));
    const feedback = document.querySelector('.invalid-feedback');
    if (feedback) {
        feedback.textContent = errorCode ? i18next.t(`errors.${errorCode}`) : '';
    }
};

const renderFeeds = () => {
    feedsContainer.innerHTML = '';
    if (state.feeds.length === 0) return;

    const title = document.createElement('h2');
    title.textContent = 'Фиды';
    const list = document.createElement('ul');
    list.className = 'list-group mb-4';

    state.feeds.forEach((feed) => {
        const item = document.createElement('li');
        item.className = 'list-group-item';
        const feedTitle = document.createElement('h3');
        feedTitle.textContent = feed.title;
        const description = document.createElement('p');
        description.className = 'mb-0';
        description.textContent = feed.description;
        item.append(feedTitle, description);
        list.append(item);
    });

    feedsContainer.append(title, list);
};

const renderPosts = () => {
    postsContainer.innerHTML = '';
    if (state.posts.length === 0) return;

    const title = document.createElement('h2');
    title.textContent = 'Посты';
    const list = document.createElement('ul');
    list.className = 'list-group';

    const sortedPosts = [...state.posts].reverse();

    sortedPosts.forEach((post) => {
        const item = document.createElement('li');
        item.className = 'list-group-item d-flex justify-content-between align-items-center';

        const link = document.createElement('a');
        link.href = post.link;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.textContent = post.title;
        link.className = state.readPosts.has(post.link) ? 'fw-normal' : 'fw-bold';

        const button = document.createElement('button');
        button.textContent = 'Просмотр';
        button.className = 'btn btn-outline-primary btn-sm';
        button.addEventListener('click', () => {
            state.readPosts.add(post.link);
            state.modal.post = post;
            state.modal.show = true;
        });

        item.append(link, button);
        list.append(item);
    });

    postsContainer.append(title, list);
};

const renderModal = () => {
    modalContainer.innerHTML = '';
    if (!state.modal.show || !state.modal.post) return;

    const modal = document.createElement('div');
    modal.className = 'modal fade show';
    modal.style.display = 'block';

    const post = state.modal.post;

    modal.innerHTML = `
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">${post.title}</h5>
          <button type="button" class="btn-close" id="modal-close"></button>
        </div>
        <div class="modal-body">
          <p>${post.description || ''}</p>
        </div>
        <div class="modal-footer">
          <a href="${post.link}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">Читать полностью</a>
          <button type="button" class="btn btn-secondary" id="modal-close-btn">Закрыть</button>
        </div>
      </div>
    </div>
  `;

    modal.querySelector('#modal-close').addEventListener('click', () => {
        state.modal.show = false;
    });
    modal.querySelector('#modal-close-btn').addEventListener('click', () => {
        state.modal.show = false;
    });

    modalContainer.append(modal);
};

export const initView = () => {
    subscribe(state, () => {
        renderError(state.form.error);
        renderFeeds();
        renderPosts();
        renderModal();
    });

    input.addEventListener('input', () => {
        state.form.url = input.value;
        state.form.error = null;
        input.classList.remove('is-invalid');
    });
};