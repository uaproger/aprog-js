import {loader as builtinLoader} from "./loader.js";
import {getAprogConfig} from "./config.js";
import {toast} from "./helper.js";
import {translate} from "./translator.js";

/** Надсилає JSON-запит до API, яке повертає поле success. */
export const connect = async ({
    url, method = "GET", body, headers: customHeaders, errorText = "error_request", result, loading = true
}) => {
    const loader = loading ? getAprogConfig().loader : null;
    const release = loader?.add();

    try {
        const headers = new Headers({"Accept": "application/json", "Content-Type": "application/json"});
        const target = new URL(url, window.location.href);
        if (target.origin === window.location.origin) {
            const token = document.querySelector("meta[name='csrf-token']")?.content;
            if (token) headers.set("X-CSRF-TOKEN", token);
        }

        new Headers(customHeaders).forEach((value, name) => headers.set(name, value));

        const response = await fetch(target.href, {method, headers, body: JSON.stringify(body)});
        const data = await response.json();
        if (!response.ok || !data?.success) {
            throw new Error(data?.message || translate(errorText));
        }

        return result ?? data;
    } catch (error) {
        const message = document.createElement("span");
        message.textContent = error instanceof Error ? error.message : String(error);
        toast().error(message, {duration: 5000});
        return false;
    } finally {
        if (loader === builtinLoader) release();
        else loader?.remove();
    }
};
