export const cookie = {
    /**
     * Отримати значення cookie по імені
     * @param {string} name
     * @returns {string|null}
     */
    get(name) {
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
        return null;
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
