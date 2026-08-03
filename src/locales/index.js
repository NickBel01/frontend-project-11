import i18next from 'i18next';
import ru from './ru.js';

export default () => i18next.init({
    lng: 'ru',
    resources: {
        ru,
    },
    interpolation: {
        escapeValue: false,
    },
});