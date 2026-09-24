// Об'єкт для зберігання завантажених перекладів
import {isEmpty} from "./general.js";

const translations = {};
let translationsLoaded = false;

/**
 * Завантаження перекладів із файлів у каталозі ./resources/lang/.
 * @param {string} language - Код мови (наприклад, "uk", "en", "ru").
 */
export const loadTranslations = async (language = "uk") => {
    try {
        const translationsModule = await import(`../../lang/${language}.json`);
        Object.assign(translations, translationsModule);
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
    let translation = translations[key] || key;
    // Замінити підстановки {key} у перекладі
    for (const [placeholder, value] of Object.entries(values)) {
        translation = translation.replace(`:${placeholder}`, value.toString());
    }
    return !isEmpty(def) ? def : translation;
};
