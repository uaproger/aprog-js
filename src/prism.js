import {pre, span} from "./general.js";

export const prism = (text) => {
    const style = `
        <style>
            pre.token.block {
                min-width: 100%;
                min-height: 100%;
                width: max-content;
                padding: 1rem;
                color: #A782BB;
                background-color: #212121;
            }
            .token.punctuation, .token.operator { color: #d0d0d0); }
            .token.property { color: #A782BB; }
            .token.string { color: #8EA765; }
            .token.number { color: #118899; }
            .token.boolean, .token.null { color: #CC7832); }
            .token.editor  {
                font-weight: 700;
                color: #1199dd;
                text-shadow: 0 0 6px rgba(255, 255, 255, 1);
            }
        </style>
    `;

    const container = pre({
        class: "token block",
        value: style
    })
    const stack = [];
    let counter = 1;

    const tokenRegex = /"(?:\\.|[^"\\])*"|true|false|null|-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?|[{}\[\],:]/g;
    let lastIndex = 0;

    const tokens = Array.from(text.matchAll(tokenRegex));

    for (let i = 0; i < tokens.length; i++) {
        const match = tokens[i];
        const token = match[0];
        const indexInText = match.index;
        const nextToken = tokens[i + 1]?.[0];

        if (indexInText > lastIndex) {
            const between = text.slice(lastIndex, indexInText);
            container.appendChild(document.createTextNode(between));
        }

        lastIndex = indexInText + token.length;

        if (token === "{" || token === "[") {
            const index = counter++;
            stack.push(index);

            const isEmpty = (token === "{" && nextToken === "}") || (token === "[" && nextToken === "]");

            if (isEmpty) {
                container.appendChild(span({
                    class: "token punctuation",
                    value: token
                }));
                continue;
            }

            const elementStart = span({
                class: `token punctuation start-${index}`,
                style: isEmpty ? {} : { cursor: "pointer" },
                dataStart: "m",
                value: isEmpty ? token : `<span class="token editor">-</span> ${token}`,
                onClick: isEmpty ? null : (event) => {
                    const el = event.target.closest(`.start-${index}`);
                    const tokenType = token;

                    if (!el) return;

                    const hide = el.dataset.start === "m";
                    el.dataset.start = hide ? "p" : "m";
                    el.innerHTML = `<span class="token editor">${hide ? "+" : "-"}</span> ${tokenType}`;

                    let sibling = el.nextSibling;

                    while (sibling) {
                        const next = sibling.nextSibling;

                        if (
                            sibling.nodeType === 1 &&
                            sibling.classList.contains(`end-${index}`)
                        ) {
                            break;
                        }

                        if (sibling.nodeType === 1) {
                            if (hide) {
                                sibling.style.display = "none";
                            } else {
                                sibling.style.display = "";
                            }
                        } else if (sibling.nodeType === 3) {
                            if (hide) {
                                const span = document.createElement("span");
                                span.className = `__hidden-text-${index}`;
                                span.style.display = "none";
                                span.appendChild(sibling.cloneNode());
                                el.parentNode.insertBefore(span, sibling);
                                el.parentNode.removeChild(sibling);
                            } else {
                                const existing = el.parentNode.querySelector(`.__hidden-text-${index}`);
                                if (existing) {
                                    const textNode = existing.firstChild;
                                    el.parentNode.insertBefore(textNode, existing);
                                    el.parentNode.removeChild(existing);
                                }
                            }
                        }

                        sibling = next;
                    }

                    const endNode = el.parentNode.querySelector(`.end-${index}`);
                    if (hide) {
                        const dots = document.createElement("span");
                        dots.className = `__dots-${index}`;
                        dots.textContent = " … ";
                        endNode.parentNode.insertBefore(dots, endNode);
                    } else {
                        const allDots = el.parentNode.querySelectorAll(`span[class*="__dots-"]`);
                        allDots.forEach(dot => {
                            const num = parseInt(dot.className.match(/__dots-(\d+)/)?.[1], 10);
                            if (!isNaN(num) && num >= index) dot.remove();
                        });

                        const allStarts = el.parentNode.querySelectorAll(`span[class*="start-"]`);
                        allStarts.forEach(startEl => {
                            const match = startEl.className.match(/start-(\d+)/);
                            const num = parseInt(match?.[1], 10);
                            if (!isNaN(num) && num >= index) {
                                startEl.dataset.start = "m";
                                const symbol = startEl.textContent.trim().slice(-1);
                                startEl.innerHTML = `<span class="token editor">-</span> ${symbol}`;
                            }
                        });
                    }
                }
            });
            container.appendChild(elementStart);
        } else if (token === "}" || token === "]") {
            const index = stack.pop();
            const elementEnd = document.createElement("span");
            elementEnd.className = `token punctuation end-${index}`;
            elementEnd.textContent = token;
            container.appendChild(elementEnd);
        } else if (token === ":") {
            const el = document.createElement("span");
            el.className = "token operator";
            el.textContent = token;
            container.appendChild(el);
        } else if (token === ",") {
            const el = document.createElement("span");
            el.className = "token punctuation";
            el.textContent = token;
            container.appendChild(el);
        } else if (/^"/.test(token)) {
            const nextChar = text[match.index + token.length];
            const content = token.slice(1, -1);
            const el = document.createElement("span");
            el.className = nextChar === ":" ? "token property" : "token string";
            el.textContent = `"${content}"`;
            container.appendChild(el);
        } else if (/^-?\d/.test(token)) {
            const el = document.createElement("span");
            el.className = "token number";
            el.textContent = token;
            container.appendChild(el);
        } else if (token === "true" || token === "false") {
            const el = document.createElement("span");
            el.className = "token boolean";
            el.textContent = token;
            container.appendChild(el);
        } else if (token === "null") {
            const el = document.createElement("span");
            el.className = "token null keyword";
            el.textContent = token;
            container.appendChild(el);
        }

        lastIndex = match.index + token.length;
    }

    if (lastIndex < text.length) {
        const remaining = text.slice(lastIndex);
        container.appendChild(document.createTextNode(remaining));
    }

    return container;
};
