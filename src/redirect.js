export const redirect = (url, { newTab = false, replace = false } = {}) => {
    if (newTab) {
        window.open(url, "_blank");
    } else if (replace) {
        window.location.replace(url);
    } else {
        window.location.href = url;
    }
}