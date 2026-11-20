// Об'єкт для зберігання завантажених перекладів
import {isEmpty} from "./general.js";
import {getAprogConfig} from "./config.js";

const translations = {};
let translationsLoaded = false;

/**
 * Завантаження перекладів із файлів у каталозі ./resources/lang/.
 * @param {string} language - Код мови (наприклад, "uk", "en", "ru").
 */
export const loadTranslations = async (language = "uk") => {
    try {
        const { langLoader } = getAprogConfig();

        if (!langLoader) {
            throw new Error("langLoader is not configured");
        }

        const module = await langLoader(language);

        Object.keys(translations).forEach(key => {
            delete translations[key];
        });

        Object.assign(translations, module.default ?? module);

        translationsLoaded = true;
    } catch (error) {
        console.error(`Помилка завантаження перекладів для мови "${language}":`, error);
    }
};

/**
 * Отримання перекладу за ключем.
 * @param {string} key - Ключ перекладу.
 * @param {object} values - Об'єкт для підстановки значень у рядок перекладу.
 * @param {string} def - Дефолтне значення.
 * @returns {string} - Перекладений рядок.
 */
export const translate = (key, values = {}, def = "") => {
    if (!translationsLoaded) {
        console.warn(`Переклади ще не завантажені. Ключ: "${key}"`);
        return !isEmpty(def) ? def : key;
    }

    let translation = translations[key];
    if (isEmpty(translation)) {
        translation = !isEmpty(def) ? def : key;
    }

    for (const [placeholder, value] of Object.entries(values)) {
        translation = translation.replaceAll(`:${placeholder}`, value.toString());
    }

    return translation;
};
