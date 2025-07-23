export const redirect = (url, {
    newTab = false,
    replace = false,
    props = {}
} = {}) => {
    const query = new URLSearchParams(props).toString();
    const finalUrl = query ? `${url}?${query}` : url;

    if (newTab) {
        window.open(finalUrl, "_blank");
    } else if (replace) {
        window.location.replace(finalUrl);
    } else {
        window.location.href = finalUrl;
    }
};

export const reload = (delaySeconds = 0.7) => setTimeout(() => window.location.reload(), (delaySeconds * 1000));

export const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const validatePassword = (password) => {
    return /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/.test(password);
};

/**
 * --- Функція для відкладеного запуску скрипта ---
 * ідентична `setTimeout`, але використовує секунди
 * @param {TimerHandler} handler
 * @param {int|float} seconds
 * @param {any[]} args
 * @return {number}
 */
export const delay = (handler, seconds, args = []) => {
    seconds *= 1000;
    return setTimeout(handler, seconds, ...args);
};

/**
 * --- Функція для циклічності скрипта ---
 * ідентична `setInterval`, але використовує секунди
 * @param {TimerHandler} handler
 * @param {int|float} seconds
 * @param {any[]} args
 * @return {number}
 */
export const cycle = (handler, seconds, args = []) => {
    seconds *= 1000;
    return setInterval(handler, seconds, ...args)
};
