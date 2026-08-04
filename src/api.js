import axios from 'axios';
import parse from './parser.js';

const getProxyUrl = (url) => {
    const proxyUrl = new URL('https://allorigins.hexlet.app/get');
    proxyUrl.searchParams.set('disableCache', 'true');
    proxyUrl.searchParams.set('url', url);
    return proxyUrl.toString();
};

const loadFeed = (url) => axios
    .get(getProxyUrl(url))
    .then((response) => parse(response.data.contents))
    .catch((err) => {
        if (err.message === 'invalidRss') {
            throw new Error('parseError');
        }
        if (err.isAxiosError) {
            throw new Error('networkError');
        }
        throw err;
    });

export default loadFeed;