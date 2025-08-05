import {GUID, isEmpty} from "./general.js";

export const cookie = {
    /**
     * --- Отримати значення cookie за ім'ям ---
     * @param {string} name
     * @param {any|null} defaulting
     * @returns {string|null}
     */
    get(name, defaulting = null) {
        const cookies = document.cookie.split('; ');
        for (let cookie of cookies) {
            const index = cookie.indexOf('=');
            if (index === -1) continue;

            const key = cookie.substring(0, index);
            const value = cookie.substring(index + 1);

            if (key === name) {
                return decodeURIComponent(value);
            }
        }
        return defaulting;
    },

    /**
     * --- Отримати всі cookie ---
     * @return {{}}
     */
    getAll() {
        return document.cookie.split('; ').reduce((acc, cookie) => {
            const [key, ...val] = cookie.split('=');
            acc[key] = decodeURIComponent(val.join('='));
            return acc;
        }, {});
    },

    /**
     * --- Встановити cookie ---
     * @param {string} name
     * @param {string} value
     * @param {number} days
     */
    set(name, value, days = 7) {
        let expires = "";
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
            expires = "; expires=" + date.toUTCString();
        }
        const safeValue = encodeURIComponent(value);
        document.cookie = `${name}=${safeValue}${expires}; path=/`;
    },

    /**
     * Видалити cookie
     * @param {string} name
     */
    delete(name) {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }
};

/**
 * --- Локальне сховище ---
 */
export const storage = {
    /**
     * --- Отримати елемент зі сховища ---
     * @param {string} key
     * @param {any|null} defaulting
     * @return {any|null}
     */
    get(key, defaulting = null) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaulting;
        } catch (e) {
            console.warn(`storage.get: invalid JSON for key "${key}"`, e);
            return defaulting;
        }
    },

    /**
     * --- Додати елемент у сховище ---
     * @param {string} key
     * @param {any} data
     */
    set(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    },

    /**
     * --- Перевірка на існування елемента у сховищі ---
     * @param {string} key
     * @return {boolean}
     */
    check(key) {
        return !isEmpty(localStorage.getItem(key));
    },

    /**
     * --- Видалити елемент зі сховища ---
     * @param {string} key
     */
    delete(key) {
        localStorage.removeItem(key);
    }
};

/**
 * --- Сховище сесії ---
 */
export const session = {
    /**
     * --- Отримати елемент з сесії ---
     * @param {string} key
     * @param {any|null} defaulting
     * @return {any|null}
     */
    get(key, defaulting = null) {
        try {
            const item = sessionStorage.getItem(key);
            return item ? JSON.parse(item) : defaulting;
        } catch (e) {
            console.warn(`session.get: invalid JSON for key "${key}"`, e);
            return defaulting;
        }
    },

    /**
     * --- Додати елемент до сесії ---
     * @param {string} key
     * @param {any} data
     */
    set(key, data) {
        sessionStorage.setItem(key, JSON.stringify(data));
    },

    /**
     * --- Перевірка на існування елемента у сесії ---
     * @param {string} key
     * @return {boolean}
     */
    check(key) {
        return !isEmpty(sessionStorage.getItem(key));
    },

    /**
     * --- Видалити елемент з сесії ---
     * @param {string} key
     */
    delete(key) {
        sessionStorage.removeItem(key);
    }
};

/**
 * --- Ключ для кешу на бекенді ---
 * @param {string} name - вводиться як абревіатура у верхньому регістрі
 * @param {boolean} create
 * @return {string}
 */
export const cacheKey = (name, create = true) => {
    let key = cookie.get(`_key_${name}`);

    if (!create) return key;

    if (!key) {
        key = GUID();
        cookie.set(`_key_${name}`, key, 30);
    } else {
        console.warn("load by cache");
    }
    return key;
};

/**
 * --- Функція завантаження файлів ---
 * @param content
 * @param filename
 */
export const downloadFile = (content, filename = "file.txt") => {
    /** Мапа: розширення -> MIME-тип */
    const extensionToMime = {
        "txt": "text/plain",
        "json": "application/json",
        "xml": "text/xml",
        "html": "text/html",
        "js": "application/javascript",
        "css": "text/css",
        "pdf": "application/pdf",
        "zip": "application/zip",
        "xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "project": "application/x-project"
    };

    /** Отримуємо розширення файлу */
    const extension = filename.split('.').pop().toLowerCase();

    /** Визначаємо MIME-тип */
    const mimeType = extensionToMime[extension] || "application/octet-stream"; // дефолт

    /** Створюємо Blob */
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);

    /** Створюємо тимчасове посилання для завантаження */
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();

    /** Видаляємо посилання та звільняємо пам'ять */
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    console.log(`✅ Файл "${filename}" (${mimeType}) завантажено.`);
};
