export const cookie = {
    get(name) {
        const cookies = document.cookie.split('; ');
        for (let cookie of cookies) {
            let [key, value] = cookie.split('=');
            if (key === name) {
                return decodeURIComponent(value);
            }
        }
        return null;
    },

    set(name, value, days = 7) {
        let expires = "";
        if (days) {
            let date = new Date();
            date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + encodeURIComponent(value) + expires + "; path=/";
    },

    delete(name) {
        document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
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
