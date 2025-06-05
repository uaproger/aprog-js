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

export const delay = (handler, seconds, args = []) => {
    seconds *= 10000;
    setTimeout(handler, seconds, ...args)
};
