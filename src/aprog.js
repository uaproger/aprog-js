export const pause = (variable) => {
    if (isNumber(variable)) {
        return new Promise(resolve => setTimeout(resolve, variable));
    } else {
        return new Promise(resolve => {
            const checkVariable = () => {
                if (variable()) {
                    resolve();
                } else {
                    setTimeout(checkVariable, 100);
                }
            };
            checkVariable();
        });
    }
};

export const date = (format, timestamp = Date.now()) => {
    const date = new Date(timestamp);

    const map = {
        Y: date.getFullYear(),
        m: String(date.getMonth() + 1).padStart(2, '0'),
        d: String(date.getDate()).padStart(2, '0'),
        H: String(date.getHours()).padStart(2, '0'),
        i: String(date.getMinutes()).padStart(2, '0'),
        s: String(date.getSeconds()).padStart(2, '0')
    };

    return format.replace(/[YmdHis]/g, match => map[match]);
};

export const chars = (word) => {
    const cyrillicToLatin = {
        'А': 'A', 'Б': 'B', 'В': 'V', 'Г': 'H', 'Д': 'D', 'Е': 'E', 'Є': 'Ye', 'Ж': 'Zh',
        'З': 'Z', 'И': 'Y', 'І': 'I', 'Ї': 'Yi', 'Й': 'Y', 'К': 'K', 'Л': 'L', 'М': 'M',
        'Н': 'N', 'О': 'O', 'П': 'P', 'Р': 'R', 'С': 'S', 'Т': 'T', 'У': 'U', 'Ф': 'F',
        'Х': 'Kh', 'Ц': 'Ts', 'Ч': 'Ch', 'Ш': 'Sh', 'Щ': 'Shch', 'Ю': 'Yu', 'Я': 'Ya',
        'а': 'a', 'б': 'b', 'в': 'v', 'г': 'h', 'д': 'd', 'е': 'e', 'є': 'ye', 'ж': 'zh',
        'з': 'z', 'и': 'y', 'і': 'i', 'ї': 'yi', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm',
        'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u', 'ф': 'f',
        'х': 'kh', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'shch', 'ю': 'yu', 'я': 'ya',
        'Ь': '', 'ь': '', 'Ъ': '', 'ъ': '', 'Э': 'E', 'э': 'e', 'Ы': 'Y', 'ы': 'y'
    };
    return word.split('').map(char => cyrillicToLatin[char] || char).join('');
};

// Validates
export const isArray = (value) => {
    return Object.prototype.toString.call(value) === '[object Array]';
};

export const isObject = (value) => {
    return Object.prototype.toString.call(value) === '[object Object]';
};

export const isPromise = (value) => {
    return Object.prototype.toString.call(value) === '[object Promise]' ||
        (typeof value === 'object' && value !== null && typeof value.then === 'function' && typeof value.catch === 'function');
};

export const isNumber = (value) => {
    return typeof value === 'number' && !Number.isNaN(value);
};

export const isNumeric = (value) => {
    return /^-?\d+(\.\d+)?$/.test(value);
};

export const isFloat = (value) => {
    return !isNaN(value) && Number(value) === value && !Number.isInteger(value);
};

export const isString = (value) => {
    return typeof value === 'string';
};

export const isNull = (value) => {
    return value === null || value === undefined;
};

const isHtmlElement = (value) => {
    const htmlElements = [
        'HTMLDivElement', "HTMLAnchorElement", 'HTMLSpanElement',
        'HTMLButtonElement', 'HTMLSelectElement', "HTMLMainElement",
        'HTMLInputElement', 'HTMLUlElement', "Promise",
        'HTMLListElement', 'HTMLLabelElement', "HTMLTableCaptionElement",
        'HTMLHRElement', 'SVGSVGElement', 'HTMLPreElement',
        'Promise', "HTMLTextAreaElement", "HTMLTableElement",
        "HTMLTHeaderElement", "HTMLTBodyElement", "HTMLTRElement",
        "HTMLTHElement", "HTMLTDElement", "HTMLTableSectionElement",
        "HTMLTableRowElement", "HTMLTableCellElement", "HTMLImageElement",
        "HTMLSectionElement"
    ]

    return htmlElements.some((element) => {
        return Object.prototype.toString.call(value) === `[object ${element}]`;
    });
};

export const isEmpty = (variable) => {
    if (variable === undefined || variable === null) {
        return true;
    }
    if (typeof variable === 'string' && variable.trim() === '') {
        return true;
    }
    if (Array.isArray(variable) && variable.length === 0) {
        return true;
    }
    if (typeof variable === 'object' && !Array.isArray(variable) && Object.keys(variable).length === 0) {
        return true;
    }
    if (typeof variable === 'number' && variable === 0) {
        return false;
    }
    return !variable;
};

export const elementToObject = (element) => {
    const obj = {};
    for (let attr of element.attributes) {
        obj[attr.name] = attr.value;
    }
    if (element.tagName.toLowerCase() === 'input') {
        obj['inputValue'] = element.value;
    } else if (element.tagName.toLowerCase() === 'select') {
        obj['selectValue'] = element.value;
    }
    return obj;
};

export const nodeListToObject = (nodeList) => {
    return Array.from(nodeList).map((el, index) => ({
        ...(el.id && {id: el.id}),
        ...(el.classList && {classList: [...el.classList]}),
        ...(el.name && {name: el.name}),
        ...(el.tagName && {element: el.tagName.toLowerCase()}),
        ...(el.children && {children: [...nodeListToObject(el.children)]}),
        ...(el.attributes && {attributes: Array.from(el.attributes).reduce((acc, attr) => {
                acc[attr.name] = attr.value;
                return acc;
            }, {})}),
        ...(el.value && {value: el.value}),
        ...(el.innerText && {value: el.innerText}),
        index: index
    }));
};

export const deepEqual = (obj1, obj2) => {
    if (obj1 === obj2) return true;
    if (obj1 == null || obj2 == null) return false;
    if (typeof obj1 !== 'object' || typeof obj2 !== 'object') return false;
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    if (keys1.length !== keys2.length) return false;
    for (const key of keys1) {
        if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
            return false;
        }
    }
    return true;
};

export const ucfirst = (str) => {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
};

export const firstKey = (object) => {
    return Object.keys(object)[0] || null;
};

export const copyText = async (element) => {
    try {
        const textToCopy = isHtmlElement(element) ? JSON.stringify(JSON.parse(element.innerText)) : element;
        await navigator.clipboard.writeText(textToCopy);
        console.log("Скопійовано");
    } catch (err) {
        console.error('Помилка копіювання! Error:', err);
    }
};

// HTML Elements
export const options = (object, selected = null, disabled = null) => {
    if (isObject(object)) {
        return Object.entries(object).map(([key, value]) => {
            key = isNumeric(key) ? parseFloat(key) : key;
            return {
                value: key,
                name: value,
                selected: key === selected,
                disabled: key === disabled,
            };
        });
    } else {
        return object.map((value, index) => {
            if (isObject(value)) {
                return Object.entries(value).map(([key, value]) => {
                    key = isNumeric(key) ? parseFloat(key) : key;
                    return {
                        value: key,
                        name: value,
                        selected: key === selected,
                        disabled: key === disabled,
                    };
                });
            } else {
                return {
                    value: value,
                    name: value,
                    selected: value === selected,
                    disabled: value === disabled,
                };
            }
        });
    }
};

export const input = (attributes = {}) => {
    let input = document.createElement("input");
    if (attributes) {
        Object.entries(attributes).forEach(([name, attrValue]) => {
            if ((name.startsWith('on') || name.startsWith("mouse")) && typeof attrValue === 'function') {
                const eventType = name.startsWith("mouse") ? name.toLowerCase() : name.slice(2).toLowerCase();
                input.addEventListener(eventType, attrValue);
            } else {
                switch (name) {
                    case "type":
                        input.type = String(attrValue);
                        break;
                    case "class":
                        input.className = String(attrValue);
                        break;
                    case "style":
                        Object.entries(attrValue).forEach(([styleName, styleValue]) => {
                            switch (styleName) {
                                case "zIndex":
                                    input.style[styleName] = `99999${styleValue}`;
                                    break;
                                default:
                                    input.style[styleName] = styleValue;
                                    break;
                            }
                        });
                        break;
                    case "disabled":
                        input.disabled = attrValue;
                        break;
                    default:
                        if (name.startsWith("data")) {
                            const kebabName = name
                                .replace(/^data/, "data")
                                .replace(/([A-Z])/g, "-$1")
                                .toLowerCase();
                            input.setAttribute(kebabName, String(attrValue));
                        } else {
                            input.setAttribute(name, String(attrValue));
                        }
                }
            }
        });
    }
    return input;
};

export const label = (attributes = {}) => {
    let label = document.createElement("label");
    label.setAttribute("for", "...");
    if (attributes) {
        Object.entries(attributes).forEach(([name, attrValue]) => {
            if ((name.startsWith('on') || name.startsWith("mouse")) && typeof attrValue === 'function') {
                const eventType = name.startsWith("mouse") ? name.toLowerCase() : name.slice(2).toLowerCase();
                label.addEventListener(eventType, attrValue);
            } else {
                switch (name) {
                    case "class":
                        label.className = String(attrValue);
                        break;
                    case "value":
                        if (isArray(attrValue)) {
                            attrValue.forEach((element) => {
                                isHtmlElement(element) ? label.appendChild(element) : label.innerHTML = String(element)
                            })
                        } else {
                            isHtmlElement(attrValue) ? label.appendChild(attrValue) : label.innerHTML = String(attrValue)
                        }
                        break;
                    case "style":
                        Object.entries(attrValue).forEach(([styleName, styleValue]) => {
                            switch (styleName) {
                                case "zIndex":
                                    label.style[styleName] = `99999${styleValue}`;
                                    break;
                                default:
                                    label.style[styleName] = styleValue;
                                    break;
                            }
                        });
                        break;
                    default:
                        if (name.startsWith("data")) {
                            const kebabName = name
                                .replace(/^data/, "data")
                                .replace(/([A-Z])/g, "-$1")
                                .toLowerCase();
                            label.setAttribute(kebabName, String(attrValue));
                        } else {
                            label.setAttribute(name, String(attrValue));
                        }
                }
            }
        });
    }
    return label;
};

export const form = (attributes = {}) => {
    let form = document.createElement("form");
    if (attributes) {
        Object.entries(attributes).forEach(([name, attrValue]) => {
            if ((name.startsWith('on') || name.startsWith("mouse")) && typeof attrValue === 'function') {
                const eventType = name.startsWith("mouse") ? name.toLowerCase() : name.slice(2).toLowerCase();
                form.addEventListener(eventType, attrValue);
            } else {
                switch (name) {
                    case "class":
                        form.className = String(attrValue);
                        break;
                    case "action":
                        form.action = String(attrValue);
                        break;
                    case "method":
                        form.method = String(attrValue);
                        break;
                    case "enctype":
                        form.enctype = String(attrValue);
                        break;
                    case "value":
                        if (isArray(attrValue)) {
                            attrValue.forEach((element) => {
                                isHtmlElement(element) ? form.append(element) : form.innerHTML = String(element)
                            })
                        } else {
                            isHtmlElement(attrValue) ? form.append(attrValue) : form.innerHTML = String(attrValue)
                        }
                        break;
                    case "style":
                        Object.entries(attrValue).forEach(([styleName, styleValue]) => {
                            switch (styleName) {
                                case "zIndex":
                                    form.style[styleName] = `99999${styleValue}`;
                                    break;
                                default:
                                    form.style[styleName] = styleValue;
                                    break;
                            }
                        });
                        break;
                    default:
                        if (name.startsWith("data")) {
                            const kebabName = name
                                .replace(/^data/, "data")
                                .replace(/([A-Z])/g, "-$1")
                                .toLowerCase();
                            form.setAttribute(kebabName, String(attrValue));
                        } else {
                            form.setAttribute(name, String(attrValue));
                        }
                }
            }
        });
    }
    return form;
};

export const div = (attributes = {}) => {
    let div = document.createElement("div");
    if (attributes) {
        Object.entries(attributes).forEach(([name, attrValue]) => {
            if ((name.startsWith('on') || name.startsWith("mouse")) && typeof attrValue === 'function') {
                const eventType = name.startsWith("mouse") ? name.toLowerCase() : name.slice(2).toLowerCase();
                div.addEventListener(eventType, attrValue);
            } else {
                switch (name) {
                    case "class":
                        div.className = String(attrValue);
                        break;
                    case "value":
                        if (isArray(attrValue)) {
                            attrValue.forEach((element) => {
                                isHtmlElement(element) ? div.append(element) : div.innerHTML = String(element)
                            })
                        } else {
                            isHtmlElement(attrValue) ? div.append(attrValue) : div.innerHTML = String(attrValue)
                        }
                        break;
                    case "style":
                        Object.entries(attrValue).forEach(([styleName, styleValue]) => {
                            switch (styleName) {
                                case "zIndex":
                                    div.style[styleName] = `99999${styleValue}`;
                                    break;
                                default:
                                    div.style[styleName] = styleValue;
                                    break;
                            }
                        });
                        break;
                    default:
                        if (name.startsWith("data")) {
                            const kebabName = name
                                .replace(/^data/, "data")
                                .replace(/([A-Z])/g, "-$1")
                                .toLowerCase();
                            div.setAttribute(kebabName, String(attrValue));
                        } else {
                            div.setAttribute(name, String(attrValue));
                        }
                }
            }
        });
    }
    return div;
};

export const a = (attributes = {}) => {
    let a = document.createElement("a");
    if (attributes) {
        Object.entries(attributes).forEach(([name, attrValue]) => {
            if ((name.startsWith('on') || name.startsWith("mouse")) && typeof attrValue === 'function') {
                const eventType = name.startsWith("mouse") ? name.toLowerCase() : name.slice(2).toLowerCase();
                a.addEventListener(eventType, attrValue);
            } else {
                switch (name) {
                    case "class":
                        a.className = String(attrValue);
                        break;
                    case "value":
                        if (isArray(attrValue)) {
                            attrValue.forEach((element) => {
                                isHtmlElement(element) ? a.append(element) : a.innerHTML = String(element)
                            })
                        } else {
                            isHtmlElement(attrValue) ? a.append(attrValue) : a.innerHTML = String(attrValue)
                        }
                        break;
                    case "style":
                        Object.entries(attrValue).forEach(([styleName, styleValue]) => {
                            switch (styleName) {
                                case "zIndex":
                                    a.style[styleName] = `99999${styleValue}`;
                                    break;
                                default:
                                    a.style[styleName] = styleValue;
                                    break;
                            }
                        });
                        break;
                    default:
                        if (name.startsWith("data")) {
                            const kebabName = name
                                .replace(/^data/, "data")
                                .replace(/([A-Z])/g, "-$1")
                                .toLowerCase();
                            a.setAttribute(kebabName, String(attrValue));
                        } else {
                            a.setAttribute(name, String(attrValue));
                        }
                }
            }
        });
    }
    return a;
};

export const span = (attributes = {}) => {
    let span = document.createElement("span");
    if (attributes) {
        Object.entries(attributes).forEach(([name, attrValue]) => {
            if ((name.startsWith('on') || name.startsWith("mouse")) && typeof attrValue === 'function') {
                const eventType = name.startsWith("mouse") ? name.toLowerCase() : name.slice(2).toLowerCase();
                span.addEventListener(eventType, attrValue);
            } else {
                switch (name) {
                    case "class":
                        span.className = String(attrValue);
                        break;
                    case "value":
                        if (isArray(attrValue)) {
                            attrValue.forEach((element) => {
                                isHtmlElement(element) ? span.append(element) : span.innerHTML = String(element)
                            })
                        } else {
                            isHtmlElement(attrValue) ? span.append(attrValue) : span.innerHTML = String(attrValue)
                        }
                        break;
                    case "style":
                        Object.entries(attrValue).forEach(([styleName, styleValue]) => {
                            switch (styleName) {
                                case "zIndex":
                                    span.style[styleName] = `99999${styleValue}`;
                                    break;
                                default:
                                    span.style[styleName] = styleValue;
                                    break;
                            }
                        });
                        break;
                    default:
                        if (name.startsWith("data")) {
                            const kebabName = name
                                .replace(/^data/, "data")
                                .replace(/([A-Z])/g, "-$1")
                                .toLowerCase();
                            span.setAttribute(kebabName, String(attrValue));
                        } else {
                            span.setAttribute(name, String(attrValue));
                        }
                }
            }
        });
    }
    return span;
};

export const textarea = (attributes = {}) => {
    let textarea = document.createElement("textarea");
    if (attributes) {
        Object.entries(attributes).forEach(([name, attrValue]) => {
            if ((name.startsWith('on') || name.startsWith("mouse")) && typeof attrValue === 'function') {
                const eventType = name.startsWith("mouse") ? name.toLowerCase() : name.slice(2).toLowerCase();
                textarea.addEventListener(eventType, attrValue);
            } else {
                switch (name) {
                    case "class":
                        textarea.className = String(attrValue);
                        break;
                    case "value":
                        if (isArray(attrValue)) {
                            attrValue.forEach((element) => {
                                isHtmlElement(element) ? textarea.appendChild(element) : textarea.innerHTML = String(element)
                            })
                        } else {
                            isHtmlElement(attrValue) ? textarea.appendChild(attrValue) : textarea.innerHTML = String(attrValue)
                        }
                        break;
                    case "style":
                        Object.entries(attrValue).forEach(([styleName, styleValue]) => {
                            switch (styleName) {
                                case "zIndex":
                                    textarea.style[styleName] = `99999${styleValue}`;
                                    break;
                                default:
                                    textarea.style[styleName] = styleValue;
                                    break;
                            }
                        });
                        break;
                    default:
                        if (name.startsWith("data")) {
                            const kebabName = name
                                .replace(/^data/, "data")
                                .replace(/([A-Z])/g, "-$1")
                                .toLowerCase();
                            textarea.setAttribute(kebabName, String(attrValue));
                        } else {
                            textarea.setAttribute(name, String(attrValue));
                        }
                }
            }
        });
    }
    return textarea;
};

export const pre = (attributes = {}) => {
    let pre = document.createElement("pre");
    if (attributes) {
        Object.entries(attributes).forEach(([name, attrValue]) => {
            if ((name.startsWith('on') || name.startsWith("mouse")) && typeof attrValue === 'function') {
                const eventType = name.startsWith("mouse") ? name.toLowerCase() : name.slice(2).toLowerCase();
                pre.addEventListener(eventType, attrValue);
            } else {
                switch (name) {
                    case "class":
                        pre.className = String(attrValue);
                        break;
                    case "value":
                        if (isArray(attrValue)) {
                            attrValue.forEach((element) => {
                                isHtmlElement(element) ? pre.appendChild(element) : pre.innerHTML = String(element)
                            })
                        } else {
                            isHtmlElement(attrValue) ? pre.appendChild(attrValue) : pre.innerHTML = String(attrValue)
                        }
                        break;
                    case "style":
                        Object.entries(attrValue).forEach(([styleName, styleValue]) => {
                            switch (styleName) {
                                case "zIndex":
                                    pre.style[styleName] = `99999${styleValue}`;
                                    break;
                                default:
                                    pre.style[styleName] = styleValue;
                                    break;
                            }
                        });
                        break;
                    default:
                        if (name.startsWith("data")) {
                            const kebabName = name
                                .replace(/^data/, "data")
                                .replace(/([A-Z])/g, "-$1")
                                .toLowerCase();
                            pre.setAttribute(kebabName, String(attrValue));
                        } else {
                            pre.setAttribute(name, String(attrValue));
                        }
                }
            }
        });
    }
    return pre;
};

export const button = (attributes = {}) => {
    let button = document.createElement("button");
    if (attributes) {
        Object.entries(attributes).forEach(([name, attrValue]) => {
            if ((name.startsWith('on') || name.startsWith("mouse")) && typeof attrValue === 'function') {
                const eventType = name.startsWith("mouse") ? name.toLowerCase() : name.slice(2).toLowerCase();
                button.addEventListener(eventType, attrValue);
            } else {
                switch (name) {
                    case "class":
                        button.className = String(attrValue);
                        break;
                    case "type":
                        button.type = String(attrValue);
                        break;
                    case "value":
                        button.innerHTML = String(attrValue);
                        break;
                    case "disabled":
                        button.disabled = attrValue;
                        break;
                    case "style":
                        Object.entries(attrValue).forEach(([styleName, styleValue]) => {
                            switch (styleName) {
                                case "zIndex":
                                    button.style[styleName] = `99999${styleValue}`;
                                    break;
                                default:
                                    button.style[styleName] = styleValue;
                                    break;
                            }
                        });
                        break;
                    default:
                        if (name.startsWith("data")) {
                            const kebabName = name
                                .replace(/^data/, "data")
                                .replace(/([A-Z])/g, "-$1")
                                .toLowerCase();
                            button.setAttribute(kebabName, String(attrValue));
                        } else {
                            button.setAttribute(name, String(attrValue));
                        }
                }
            }
        });
    }
    return button;
};

export const select = (attributes = {}) => {
    let select = document.createElement("select");
    let option = document.createElement("option");
    if (attributes) {
        Object.entries(attributes).forEach(([name, attrValue]) => {
            if ((name.startsWith('on') || name.startsWith("mouse")) && typeof attrValue === 'function') {
                const eventType = name.startsWith("mouse") ? name.toLowerCase() : name.slice(2).toLowerCase();
                select.addEventListener(eventType, attrValue);
            } else {
                switch (name) {
                    case "class":
                        select.className = String(attrValue);
                        break;
                    case "style":
                        Object.entries(attrValue).forEach(([styleName, styleValue]) => {
                            switch (styleName) {
                                case "zIndex":
                                    select.style[styleName] = `99999${styleValue}`;
                                    break;
                                default:
                                    select.style[styleName] = styleValue;
                                    break;
                            }
                        });
                        break;
                    case "option":
                        Object.entries(attrValue).forEach(([optionName, optionValue]) => {
                            switch (optionName) {
                                case "value":
                                    option.setAttribute('value', String(optionValue));
                                    break;
                                case "name":
                                    option.innerHTML = String(optionValue);
                                    break;
                                case "selected":
                                    option.selected = true;
                                    break;
                                case "disabled":
                                    option.disabled = true;
                                    break;
                            }
                        });
                        select.appendChild(option);
                        break;
                    case "options":
                        attrValue.forEach((opt) => {
                            let customOption = document.createElement("option");
                            Object.entries(opt).forEach(([optionName, optionValue]) => {
                                switch (optionName) {
                                    case "value":
                                        customOption.value = String(optionValue);
                                        break;
                                    case "name":
                                        customOption.innerHTML = String(optionValue);
                                        break;
                                    case "selected":
                                        customOption.selected = Boolean(optionValue);
                                        break;
                                    case "disabled":
                                        customOption.disabled = Boolean(optionValue);
                                        break;
                                }
                            });
                            select.appendChild(customOption);
                        });
                        break;
                    default:
                        if (name.startsWith("data")) {
                            const kebabName = name
                                .replace(/^data/, "data")
                                .replace(/([A-Z])/g, "-$1")
                                .toLowerCase();
                            select.setAttribute(kebabName, String(attrValue));
                        } else {
                            select.setAttribute(name, String(attrValue));
                        }
                }
            }
        });
    }
    return select;
};

export const option = (attributes = {}) => {
    let option = document.createElement("option");
    if (attributes) {
        Object.entries(attributes).forEach(([optionName, optionValue]) => {
            switch (optionName) {
                case "value": option.value = optionValue; break;
                case "name": option.textContent = optionValue; break;
                case "selected": option.selected = !!optionValue; break;
                case "disabled": option.disabled = !!optionValue; break;
            }
        });
    }
    return option;
};

export const hr = (attributes = {}) => {
    let hr = document.createElement("hr");
    if (attributes) {
        Object.entries(attributes).forEach(([name, attrValue]) => {
            switch (name) {
                case "class": hr.className = String(attrValue); break;
                case "style": Object.entries(attrValue).forEach(([styleName, styleValue]) => {
                    switch (styleName) {
                        case "zIndex": hr.style[styleName] = `99999${styleValue}`; break;
                        default: hr.style[styleName] = styleValue; break;
                    }
                }); break;
                default: hr.setAttribute(name, String(attrValue));
            }
        });
    }
    return hr;
};

export const meta = (attributes = {}) => {
    let meta = document.createElement("meta");
    if (attributes) {
        Object.entries(attributes).forEach(([name, attrValue]) => {
            switch (name) {
                case "class": meta.className = String(attrValue); break;
                case "style": Object.entries(attrValue).forEach(([styleName, styleValue]) => {
                    switch (styleName) {
                        case "zIndex": meta.style[styleName] = `99999${styleValue}`; break;
                        default: meta.style[styleName] = styleValue; break;
                    }
                }); break;
                default: meta.setAttribute(name, String(attrValue));
            }
        });
    }
    return meta;
};

export const table = (attributes = {}) => {
    let table = document.createElement("table");
    if (attributes) {
        Object.entries(attributes).forEach(([name, attrValue]) => {
            if ((name.startsWith('on') || name.startsWith("mouse")) && typeof attrValue === 'function') {
                const eventType = name.startsWith("mouse") ? name.toLowerCase() : name.slice(2).toLowerCase();
                table.addEventListener(eventType, attrValue);
            } else {
                switch (name) {
                    case "class":
                        table.className = String(attrValue);
                        break;
                    case "value":
                        if (isArray(attrValue)) {
                            attrValue.forEach((element) => {
                                isHtmlElement(element) ? table.append(element) : table.innerHTML = String(element)
                            })
                        } else {
                            isHtmlElement(attrValue) ? table.append(attrValue) : table.innerHTML = String(attrValue)
                        }
                        break;
                    case "style":
                        Object.entries(attrValue).forEach(([styleName, styleValue]) => {
                            switch (styleName) {
                                case "zIndex":
                                    table.style[styleName] = `99999${styleValue}`;
                                    break;
                                default:
                                    table.style[styleName] = styleValue;
                                    break;
                            }
                        });
                        break;
                    default:
                        if (name.startsWith("data")) {
                            const kebabName = name
                                .replace(/^data/, "data")
                                .replace(/([A-Z])/g, "-$1")
                                .toLowerCase();
                            table.setAttribute(kebabName, String(attrValue));
                        } else {
                            table.setAttribute(name, String(attrValue));
                        }
                }
            }
        });
    }
    return table;
};

export const caption = (attributes = {}) => {
    let caption = document.createElement("caption");
    if (attributes) {
        Object.entries(attributes).forEach(([name, attrValue]) => {
            if ((name.startsWith('on') || name.startsWith("mouse")) && typeof attrValue === 'function') {
                const eventType = name.startsWith("mouse") ? name.toLowerCase() : name.slice(2).toLowerCase();
                caption.addEventListener(eventType, attrValue);
            } else {
                switch (name) {
                    case "side":
                        caption.style.captionSide = String(attrValue);
                        break;
                    case "class":
                        caption.className = String(attrValue);
                        break;
                    case "value":
                        if (isArray(attrValue)) {
                            attrValue.forEach((element) => {
                                isHtmlElement(element) ? caption.append(element) : caption.innerHTML = String(element)
                            })
                        } else {
                            isHtmlElement(attrValue) ? caption.append(attrValue) : caption.innerHTML = String(attrValue)
                        }
                        break;
                    case "style":
                        Object.entries(attrValue).forEach(([styleName, styleValue]) => {
                            switch (styleName) {
                                case "zIndex":
                                    caption.style[styleName] = `99999${styleValue}`;
                                    break;
                                default:
                                    caption.style[styleName] = styleValue;
                                    break;
                            }
                        });
                        break;
                    default:
                        if (name.startsWith("data")) {
                            const kebabName = name
                                .replace(/^data/, "data")
                                .replace(/([A-Z])/g, "-$1")
                                .toLowerCase();
                            caption.setAttribute(kebabName, String(attrValue));
                        } else {
                            caption.setAttribute(name, String(attrValue));
                        }
                }
            }
        });
    }
    return caption;
};

export const thead = (attributes = {}) => {
    let thead = document.createElement("thead");
    if (attributes) {
        Object.entries(attributes).forEach(([name, attrValue]) => {
            if ((name.startsWith('on') || name.startsWith("mouse")) && typeof attrValue === 'function') {
                const eventType = name.startsWith("mouse") ? name.toLowerCase() : name.slice(2).toLowerCase();
                thead.addEventListener(eventType, attrValue);
            } else {
                switch (name) {
                    case "class":
                        thead.className = String(attrValue);
                        break;
                    case "value":
                        if (isArray(attrValue)) {
                            attrValue.forEach((element) => {
                                isHtmlElement(element) ? thead.append(element) : thead.innerHTML = String(element)
                            })
                        } else {
                            isHtmlElement(attrValue) ? thead.append(attrValue) : thead.innerHTML = String(attrValue)
                        }
                        break;
                    case "style":
                        Object.entries(attrValue).forEach(([styleName, styleValue]) => {
                            switch (styleName) {
                                case "zIndex":
                                    thead.style[styleName] = `99999${styleValue}`;
                                    break;
                                default:
                                    thead.style[styleName] = styleValue;
                                    break;
                            }
                        });
                        break;
                    default:
                        if (name.startsWith("data")) {
                            const kebabName = name
                                .replace(/^data/, "data")
                                .replace(/([A-Z])/g, "-$1")
                                .toLowerCase();
                            thead.setAttribute(kebabName, String(attrValue));
                        } else {
                            thead.setAttribute(name, String(attrValue));
                        }
                }
            }
        });
    }
    return thead;
};

export const tbody = (attributes = {}) => {
    let tbody = document.createElement("tbody");
    if (attributes) {
        Object.entries(attributes).forEach(([name, attrValue]) => {
            if ((name.startsWith('on') || name.startsWith("mouse")) && typeof attrValue === 'function') {
                const eventType = name.startsWith("mouse") ? name.toLowerCase() : name.slice(2).toLowerCase();
                tbody.addEventListener(eventType, attrValue);
            } else {
                switch (name) {
                    case "class":
                        tbody.className = String(attrValue);
                        break;
                    case "value":
                        if (isArray(attrValue)) {
                            attrValue.forEach((element) => {
                                isHtmlElement(element) ? tbody.append(element) : tbody.innerHTML = String(element)
                            })
                        } else {
                            isHtmlElement(attrValue) ? tbody.append(attrValue) : tbody.innerHTML = String(attrValue)
                        }
                        break;
                    case "style":
                        Object.entries(attrValue).forEach(([styleName, styleValue]) => {
                            switch (styleName) {
                                case "zIndex":
                                    tbody.style[styleName] = `99999${styleValue}`;
                                    break;
                                default:
                                    tbody.style[styleName] = styleValue;
                                    break;
                            }
                        });
                        break;
                    default:
                        if (name.startsWith("data")) {
                            const kebabName = name
                                .replace(/^data/, "data")
                                .replace(/([A-Z])/g, "-$1")
                                .toLowerCase();
                            tbody.setAttribute(kebabName, String(attrValue));
                        } else {
                            tbody.setAttribute(name, String(attrValue));
                        }
                }
            }
        });
    }
    return tbody;
};

export const tr = (attributes = {}) => {
    let tr = document.createElement("tr");
    if (attributes) {
        Object.entries(attributes).forEach(([name, attrValue]) => {
            if ((name.startsWith('on') || name.startsWith("mouse")) && typeof attrValue === 'function') {
                const eventType = name.startsWith("mouse") ? name.toLowerCase() : name.slice(2).toLowerCase();
                tr.addEventListener(eventType, attrValue);
            } else {
                switch (name) {
                    case "class":
                        tr.className = String(attrValue);
                        break;
                    case "value":
                        if (isArray(attrValue)) {
                            attrValue.forEach((element) => {
                                isHtmlElement(element) ? tr.append(element) : tr.innerHTML = String(element)
                            })
                        } else {
                            isHtmlElement(attrValue) ? tr.append(attrValue) : tr.innerHTML = String(attrValue)
                        }
                        break;
                    case "style":
                        Object.entries(attrValue).forEach(([styleName, styleValue]) => {
                            switch (styleName) {
                                case "zIndex":
                                    tr.style[styleName] = `99999${styleValue}`;
                                    break;
                                default:
                                    tr.style[styleName] = styleValue;
                                    break;
                            }
                        });
                        break;
                    default:
                        if (name.startsWith("data")) {
                            const kebabName = name
                                .replace(/^data/, "data")
                                .replace(/([A-Z])/g, "-$1")
                                .toLowerCase();
                            tr.setAttribute(kebabName, String(attrValue));
                        } else {
                            tr.setAttribute(name, String(attrValue));
                        }
                }
            }
        });
    }
    return tr;
};

export const th = (attributes = {}) => {
    let th = document.createElement("th");
    if (attributes) {
        Object.entries(attributes).forEach(([name, attrValue]) => {
            if ((name.startsWith('on') || name.startsWith("mouse")) && typeof attrValue === 'function') {
                const eventType = name.startsWith("mouse") ? name.toLowerCase() : name.slice(2).toLowerCase();
                th.addEventListener(eventType, attrValue);
            } else {
                switch (name) {
                    case "class":
                        th.className = String(attrValue);
                        break;
                    case "value":
                        if (isArray(attrValue)) {
                            attrValue.forEach((element) => {
                                isHtmlElement(element) ? th.append(element) : th.innerHTML = String(element)
                            })
                        } else {
                            isHtmlElement(attrValue) ? th.append(attrValue) : th.innerHTML = String(attrValue)
                        }
                        break;
                    case "style":
                        Object.entries(attrValue).forEach(([styleName, styleValue]) => {
                            switch (styleName) {
                                case "zIndex":
                                    th.style[styleName] = `99999${styleValue}`;
                                    break;
                                default:
                                    th.style[styleName] = styleValue;
                                    break;
                            }
                        });
                        break;
                    default:
                        if (name.startsWith("data")) {
                            const kebabName = name
                                .replace(/^data/, "data")
                                .replace(/([A-Z])/g, "-$1")
                                .toLowerCase();
                            th.setAttribute(kebabName, String(attrValue));
                        } else {
                            th.setAttribute(name, String(attrValue));
                        }
                }
            }
        });
    }
    return th;
};

export const td = (attributes = {}) => {
    let td = document.createElement("td");
    if (attributes) {
        Object.entries(attributes).forEach(([name, attrValue]) => {
            if ((name.startsWith('on') || name.startsWith("mouse")) && typeof attrValue === 'function') {
                const eventType = name.startsWith("mouse") ? name.toLowerCase() : name.slice(2).toLowerCase();
                td.addEventListener(eventType, attrValue);
            } else {
                switch (name) {
                    case "class":
                        td.className = String(attrValue);
                        break;
                    case "value":
                        if (isArray(attrValue)) {
                            attrValue.forEach((element) => {
                                isHtmlElement(element) ? td.append(element) : td.innerHTML = String(element)
                            })
                        } else {
                            isHtmlElement(attrValue) ? td.append(attrValue) : td.innerHTML = String(attrValue)
                        }
                        break;
                    case "style":
                        Object.entries(attrValue).forEach(([styleName, styleValue]) => {
                            switch (styleName) {
                                case "zIndex":
                                    td.style[styleName] = `99999${styleValue}`;
                                    break;
                                default:
                                    td.style[styleName] = styleValue;
                                    break;
                            }
                        });
                        break;
                    default:
                        if (name.startsWith("data")) {
                            const kebabName = name
                                .replace(/^data/, "data")
                                .replace(/([A-Z])/g, "-$1")
                                .toLowerCase();
                            td.setAttribute(kebabName, String(attrValue));
                        } else {
                            td.setAttribute(name, String(attrValue));
                        }
                }
            }
        });
    }
    return td;
};

export const img = (attributes = {}) => {
    let img = document.createElement("img");
    img.alt = "img...";
    if (attributes) {
        Object.entries(attributes).forEach(([name, attrValue]) => {
            if ((name.startsWith('on') || name.startsWith("mouse")) && typeof attrValue === 'function') {
                const eventType = name.startsWith("mouse") ? name.toLowerCase() : name.slice(2).toLowerCase();
                img.addEventListener(eventType, attrValue);
            } else {
                switch (name) {
                    case "class":
                        img.className = String(attrValue);
                        break;
                    case "src":
                        img.src = String(attrValue);
                        break;
                    case "alt":
                        img.alt = String(attrValue);
                        break;
                    case "style":
                        Object.entries(attrValue).forEach(([styleName, styleValue]) => {
                            switch (styleName) {
                                case "zIndex":
                                    img.style[styleName] = `99999${styleValue}`;
                                    break;
                                default:
                                    img.style[styleName] = styleValue;
                                    break;
                            }
                        });
                        break;
                    default:
                        if (name.startsWith("data")) {
                            const kebabName = name
                                .replace(/^data/, "data")
                                .replace(/([A-Z])/g, "-$1")
                                .toLowerCase();
                            img.setAttribute(kebabName, String(attrValue));
                        } else {
                            img.setAttribute(name, String(attrValue));
                        }
                }
            }
        });
    }
    return img;
};

export const apState = (initialValue) => {
    let state = initialValue;
    const getState = () => state;
    const setState = (newValue) => {
        if (typeof newValue === "function") {
            state = newValue(state);
        } else {
            state = newValue;
        }
    }
    return [getState, setState];
};

export const apFetch = async (url, params = {}) => {
    const [data, setData] = apState(null);
    const [error, setError] = apState(null);
    const [isLoading, setIsLoading] = apState(false);

    const fetchData = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(url, params);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const result = await response.json();
            setData(result);
        } catch (err) {
            console.error(err.message)
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };
    await fetchData();

    return [data, error, isLoading];
};

export const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
};

export const scrollToBottom = () => {
    window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
    });
};

export const _get = (name, defaulting = null) => {
    let url = new URL(window.location.href);
    let searchParams = new URLSearchParams(url.search);
    if (searchParams.has(name)) {
        return isFloat(searchParams.get(name)) || isNumeric(searchParams.get(name))
            ? parseFloat(searchParams.get(name))
            : searchParams.get(name);
    }
    return defaulting;
};

export const _getAll = () => {
    let url = new URL(window.location.href);
    let searchParams = new URLSearchParams(url.search);
    let params = {};
    searchParams.forEach((value, key) => {
        params[key] = isFloat(value) || isNumeric(value) ? parseFloat(value) : value;
    });
    return params;
};

export const GUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (char) {
        const random = Math.random() * 16 | 0;
        const value = char === 'x' ? random : (random & 0x3 | 0x8);
        return value.toString(16);
    });
};

export const checkArrays = (arr1, arr2, checkAll = false) => {
    const set1 = new Set(arr1);
    if (checkAll) {
        return arr2.every(item => set1.has(item));
    } else {
        return arr2.some(item => set1.has(item));
    }
};

const customTitle = (text) => {
    const title = div({
        id: "tooltip",
        style: {
            position: "absolute",
            padding: "6px 10px",
            display: "block",
            fontSize: "10px",
            whiteSpace: "nowrap",
            color: "#ffffff",
            background: "rgba(51, 51, 51, 0.8)",
            borderRadius: "0.5rem",
            boxShadow: "0 3 7 rgba(51, 51, 51, 0.8)",
            pointerEvents: "none",
            zIndex: 1000,
        },
        value: text
    });
    document.body.appendChild(title);

    return title;
};

export const attachCustomTitle = (element, text) => {
    let tooltip = element._customTooltip;

    if (!tooltip) {
        tooltip = customTitle(text);
        element._customTooltip = tooltip;
    }

    element.addEventListener("mouseenter", () => {
        tooltip.style.display = "block";
    });

    element.addEventListener("mousemove", (e) => {
        tooltip.style.left = `${e.pageX + 10}px`;
        tooltip.style.top = `${e.pageY + 10}px`;
    });

    element.addEventListener("mouseleave", () => {
        tooltip.style.display = "none";
    });
};
