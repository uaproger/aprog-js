import {div, isObject, isArray, isEmpty, GUID} from "./general.js";
import {toast} from "./helper.js";
import {translate} from "./translator.js";
import {svg} from "./svg.js";

const show = async ({ html = null, isClass = "", closed = true, styles = {} }) => {
    try {
        const modals = document.querySelectorAll(".aprog-modal");
        const guid = GUID();
        const body = document.querySelector('body');

        const close = div({
            className: `aprog-close ${closed ? "" : "hidden"}`,
            value: svg({stroke: "#ffffff"}).close
        });
        const modal = div({
            id: guid,
            className: `aprog-modal ${isClass}`,
            style: {
                ...styles,
                transition: "all 350ms ease-in-out",
                opacity: "0",
                zIndex: modals.length + 1
            }
        });
        const background = div({
            dataModalId: guid,
            className: "aprog-background-modal",
            style: {zIndex: modals.length}
        });
        background.addEventListener("click", () => eventClose(body, modal, background));
        const eventClose = (body, modal, background) => {
            body.removeChild(modal);
            body.removeChild(background);
            const isModal = document.querySelectorAll(".modal");
            if (isEmpty(isModal)) {
                body.style.overflow = null;
            }
        };
        setTimeout(async () => {
            modal.style.opacity = "1";
        }, 50);
        if (html) {
            if (isObject(html)) {
                Object.entries(html).forEach((element) => {
                    modal.appendChild(element);
                });
            } else if (isArray(html)) {
                html.forEach((element) => {
                    modal.appendChild(element);
                })
            } else {
                modal.appendChild(html);
            }
        }
        modal.appendChild(close);
        body.appendChild(background);
        body.appendChild(modal);
        body.style.overflow = "hidden";
        close.addEventListener('click', () => eventClose(body, modal, background));
    } catch (error) {
        toast().error(translate("error_create_modal"), {duration: 5000, relay: 0, fontSize: "16px", error: error});
    }
};

export const modal = (props = {
    html: null,
    isClass: "",
    closed: true,
    styles: {}
}) => show(props).then();

export const Modal = ({
    title = div({}),
    body = div({}),
    btns = div({}),
    className = "",
    styles = {}
}) => {
    return modal({
        html: div({
            className: "aprog-block-modal",
            value: [
                div({
                    className: "aprog-title-modal",
                    value: title
                }),
                body,
                div({
                    className: "aprog-block-btns-modal",
                    value: btns
                })
            ]
        }),
        isClass: className,
        styles: styles
    });
};

export const closeAllModals = () => {
    const modals = document.querySelectorAll(".modal");
    const backgrounds = document.querySelectorAll(".background-modal");
    modals.forEach(item => item.remove());
    backgrounds.forEach(item => item.remove());
    const body = document.querySelector('body');
    body.style.overflow = null;
};

export const closeThisModal = (target) => {
    const modal = target.closest('.modal');
    const background = document.querySelector(`[data-modal-id="${modal.id}"]`);
    modal.remove();
    if (background) {
        background.remove();
    }
    const isModal = document.querySelectorAll(".modal");
    if (isEmpty(isModal)) {
        const body = document.querySelector('body');
        body.style.overflow = null;
    }
};
