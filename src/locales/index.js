import i18next from 'i18next';

const resources = {
    ru: {
        translation: {
            title: 'RSS Reader',
            placeholder: 'Ссылка RSS',
            addButton: 'Добавить',
            viewButton: 'Просмотр',
            closeButton: 'Закрыть',
            readMore: 'Читать полностью',
            feeds: 'Фиды',
            posts: 'Посты',
            loaded: 'RSS успешно загружен',
            errors: {
                required: 'Не должно быть пустым',
                invalidUrl: 'Ссылка должна быть валидным URL',
                duplicate: 'RSS уже существует',
                parseError: 'Ресурс не содержит валидный RSS',
                networkError: 'Ошибка сети',
            },
        },
    },
};

const initI18n = () => i18next.init({
    lng: 'ru',
    resources,
    interpolation: {
        escapeValue: false,
    },
});

export default initI18n;