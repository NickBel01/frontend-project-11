import * as yup from 'yup';

export const validateUrl = (url, existingUrls) => {
    const schema = yup
        .string()
        .required()
        .url()
        .notOneOf(existingUrls);

    return schema.validate(url);
};