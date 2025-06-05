import {GUID} from "./aprog.js";

export const cookie = {
    /**
     * Отримати значення cookie за ім'ям
     * @param {string} name
     * @param defaulting
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
     * Отримати всі cookie
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
     * Встановити cookie
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

export const storage = {
    get(key, defaulting = null) {
        return JSON.parse(localStorage.getItem(key)) || defaulting;
    },

    set(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    },

    delete(key) {
        localStorage.removeItem(key);
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
        console.warn("load_by_cache");
    }
    return key;
}
