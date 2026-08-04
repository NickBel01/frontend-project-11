import { subscribe } from 'valtio/vanilla';
import i18next from 'i18next';
import state from './state.js';

const input = document.getElementById('url-input');
const feedsContainer = document.getElementById('feeds');
const postsContainer = document.getElementById('posts');

const renderError = (errorCode) => {
    input.classList.toggle('is-invalid', Boolean(errorCode));

    const feedback = document.querySelector('.invalid-feedback');

    if (feedback) {
        feedback.textContent = errorCode
            ? i18next.t(`errors.${errorCode}`)
            : '';
    }
};

const renderFeeds = () => {
    feedsContainer.innerHTML = '';

    if (state.feeds.length === 0) {
        return;
    }

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

        item.append(feedTitle);
        item.append(description);
        list.append(item);
    });

    feedsContainer.append(title);
    feedsContainer.append(list);
};

const renderPosts = () => {
    postsContainer.innerHTML = '';

    if (state.posts.length === 0) {
        return;
    }

    const title = document.createElement('h2');
    title.textContent = 'Посты';

    const list = document.createElement('ul');
    list.className = 'list-group';

    const sortedPosts = [...state.posts].reverse();

    sortedPosts.forEach((post) => {
        const item = document.createElement('li');
        item.className = 'list-group-item';

        const link = document.createElement('a');
        link.href = post.link;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.textContent = post.title;

        item.append(link);
        list.append(item);
    });

    postsContainer.append(title);
    postsContainer.append(list);
};

export const initView = () => {
    subscribe(state, () => {
        renderError(state.form.error);
        renderFeeds();
        renderPosts();
    });

    input.addEventListener('input', () => {
        state.form.url = input.value;
        state.form.error = null;
        input.classList.remove('is-invalid');
    });
};