const appendValue = (element, value) => {
    if (value === null || value === undefined || value === false) {
        return;
    }

    if (Array.isArray(value)) {
        value.forEach(item => appendValue(element, item));
        return;
    }

    if (value instanceof Node) {
        element.append(value);
        return;
    }

    element.insertAdjacentHTML("beforeend", String(value));
};

const setStyle = (element, styles) => {
    if (typeof styles === "string") {
        element.style.cssText = styles;
        return;
    }

    Object.assign(element.style, styles);
};

const setDataset = (element, dataset) => {
    Object.entries(dataset).forEach(([key, value]) => {
        element.dataset[key] = String(value);
    });
};

const setAttributes = (element, attributes = {}) => {
    Object.entries(attributes).forEach(([name, value]) => {
        if (value === null || value === undefined || value === false) {
            return;
        }

        // content
        if (name === "value" && !["INPUT", "TEXTAREA", "SELECT", "OPTION"].includes(element.tagName)) {
            appendValue(element, value);
            return;
        }

        // children
        if (name === "children") {
            appendValue(element, value);
            return;
        }

        // text
        if (name === "text" || name === "textContent") {
            element.textContent = String(value);
            return;
        }

        // html
        if (name === "html" || name === "innerHTML") {
            element.innerHTML = String(value);
            return;
        }

        // class
        if (name === "class" || name === "className") {
            if (Array.isArray(value)) {
                element.className = value.filter(Boolean).join(" ");
            } else {
                element.className = String(value);
            }

            return;
        }

        // style
        if (name === "style") {
            setStyle(element, value);
            return;
        }

        // dataset
        if (name === "dataset") {
            setDataset(element, value);
            return;
        }

        // events
        if (name.startsWith("on") && typeof value === "function") {
            element.addEventListener(name.slice(2).toLowerCase(), value);

            return;
        }

        // focus
        if (name === "focus" && value) {
            queueMicrotask(() => element.focus());
            return;
        }

        // DOM properties
        if (name in element) {
            try {
                element[name] = value;
                return;
            } catch (_) {
                // fallback → setAttribute
            }
        }

        // dataSomething → data-something
        if (name.startsWith("data") && name.length > 4) {
            const attribute = name
                .replace(/([A-Z])/g, "-$1")
                .toLowerCase();

            element.setAttribute(attribute, String(value));
            return;
        }

        // ariaSomething → aria-something
        if (name.startsWith("aria") && name.length > 4) {
            const attribute = name
                .replace(/([A-Z])/g, "-$1")
                .toLowerCase();

            element.setAttribute(attribute, String(value));
            return;
        }

        // boolean attribute
        if (value === true) {
            element.setAttribute(name, "");
            return;
        }

        // everything else
        element.setAttribute(name, String(value));
    });

    return element;
};

export const element = (tag = "div", attributes = {}) => {
    return setAttributes(document.createElement(tag), attributes);
};

export const div = (attributes = {}) => element("div", attributes);

export const span = (attributes = {}) => element("span", attributes);

export const a = (attributes = {}) => element("a", attributes);

export const button = (attributes = {}) => element("button", attributes);

export const input = (attributes = {}) => element("input", attributes);

export const label = (attributes = {}) => element("label", attributes);

export const form = (attributes = {}) => element("form", attributes);

export const textarea = (attributes = {}) => element("textarea", attributes);

export const pre = (attributes = {}) => element("pre", attributes);

export const select = (attributes = {}) => element("select", attributes);

export const option = (attributes = {}) => element("option", attributes);

export const img = (attributes = {}) => element("img", attributes);

export const table = (attributes = {}) => element("table", attributes);

export const caption = (attributes = {}) => element("caption", attributes);

export const thead = (attributes = {}) => element("thead", attributes);

export const tbody = (attributes = {}) => element("tbody", attributes);

export const tr = (attributes = {}) => element("tr", attributes);

export const th = (attributes = {}) => element("th", attributes);

export const td = (attributes = {}) => element("td", attributes);

export const h1 = (attributes = {}) => element("h1", attributes);

export const h2 = (attributes = {}) => element("h2", attributes);

export const h3 = (attributes = {}) => element("h3", attributes);

export const h4 = (attributes = {}) => element("h4", attributes);

export const h5 = (attributes = {}) => element("h5", attributes);

export const section = (attributes = {}) => element("section", attributes);

export const header = (attributes = {}) => element("header", attributes);

export const footer = (attributes = {}) => element("footer", attributes);

export const ul = (attributes = {}) => element("ul", attributes);

export const li = (attributes = {}) => element("li", attributes);

export const hr = (attributes = {}) => element("hr", attributes);

export const head = (attributes = {}) => element("head", attributes);

export const body = (attributes = {}) => element("body", attributes);

export const meta = (attributes = {}) => element("meta", attributes);

export const style = (attributes = {}) => element("style", attributes);

export const script = (attributes = {}) => element("script", attributes);
