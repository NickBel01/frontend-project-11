import * as yup from 'yup';

export const validateUrl = (url, existingUrls) => {
    const schema = yup
        .string()
        .required('required')
        .url('invalidUrl')
        .notOneOf(existingUrls, 'duplicate');

    return schema.validate(url);
};