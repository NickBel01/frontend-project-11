const parse = (data) => {
    const parser = new DOMParser();
    const document = parser.parseFromString(data, 'application/xml');

    const parserError = document.querySelector('parsererror');

    if (parserError) {
        throw new Error('invalidRss');
    }

    const channel = document.querySelector('channel');

    if (!channel) {
        throw new Error('invalidRss');
    }

    const title = channel.querySelector('title')?.textContent;
    const description = channel.querySelector('description')?.textContent;

    if (!title || !description) {
        throw new Error('invalidRss');
    }

    const items = [...channel.querySelectorAll('item')];

    const posts = items.map((item) => ({
        title: item.querySelector('title')?.textContent ?? '',
        description: item.querySelector('description')?.textContent ?? '',
        link: item.querySelector('link')?.textContent ?? '',
    }));

    return {
        feed: {
            title,
            description,
        },
        posts,
    };
};

export default parse;