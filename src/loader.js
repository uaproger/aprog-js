import {div} from "./elements.js";

const active = new Map();
const requests = new Set();

function createIndicator(fullscreen, color) {
    const indicator = div({
        className: "aprog-loader",
        role: "status",
        "aria-label": "Завантаження",
        style: {
            display: "inline-flex", justifyContent: "center", alignItems: "center",
            gap: "4px", minHeight: "48px", color,
            ...(fullscreen && {
                position: "fixed", inset: "0", zIndex: "2147483646",
                backgroundColor: "rgb(255 255 255 / 39%)", backdropFilter: "blur(4px)"
            })
        }
    });
    const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    for (const [index, height] of [12, 22, 32, 22, 12].entries()) {
        const bar = div({style: {
            width: "6px", height: height + "px", borderRadius: "6px", background: "currentColor"
        }});
        indicator.append(bar);
        if (!reducedMotion) {
            bar.animate?.([
                {transform: "scaleY(0.55)", opacity: 0.45},
                {transform: "scaleY(1.2)", opacity: 1},
                {transform: "scaleY(0.55)", opacity: 0.45}
            ], {duration: 900, delay: index * 90, iterations: Infinity, easing: "ease-in-out"});
        }
    }
    return indicator;
}

export const loader = {
    add({target, replaceContent = false, color = "var(--aprog-loader-color, #407bff)"} = {}) {
        const host = typeof target === "string" && target ? document.querySelector(target) : target;
        const container = target ? host : document.body;
        if (!container) throw new Error("Контейнер лоадера не знайдено");

        // Оверлей і локальний індикатор у body можуть працювати одночасно.
        const key = target ? container : document;
        let entry = active.get(key);
        if (!entry || entry.indicator.parentNode !== container) {
            const indicator = createIndicator(!target, color);
            if (target && replaceContent) container.replaceChildren(indicator);
            else container.append(indicator);
            entry = {indicator, count: 0};
            active.set(key, entry);
        }
        entry.count++;
        const release = () => {
            if (!requests.delete(release)) return;
            if (--entry.count === 0) {
                entry.indicator.remove();
                if (active.get(key) === entry) active.delete(key);
            }
        };
        requests.add(release);
        return release;
    },

    remove() {
        requests.values().next().value?.();
    }
};
