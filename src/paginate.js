import {storage} from "./storage.js";
import {button, div} from "./aprog.js";

export const paginate = ({ count = 0, currentPage = 1, onPageChange = () => {}, colors = {} } = {}) => {
    const defaultColors = {
        defaultColor: "#043458",
        backgroundColor: "#ffffff",
        boxShadow: "0 3px 6px 0 rgba(115,73,118, 0.4), 0 3px 6px 0 rgba(115,73,118, 0.39)",
        borderRadius: "0.5rem",
        fontSize: "16px",
        borderWidth: "0.0313rem",
        border: "border: ${theme.borderWidth} solid ${theme.defaultColor};"
    };

    const theme = { ...defaultColors, ...colors };

    const styles = `
        <style>
            .paginate-block {
                width: 100vw;
                padding: 0 20px;
                margin: 20px 0;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 5px;
            }
            .paginate-btn,
            .paginate-dots,
            .paginate-prev,
            .paginate-next {
                padding: 10px 20px;
                font-size: ${theme.fontSize};
                font-weight: 600;
                color: ${theme.defaultColor};
                background: ${theme.backgroundColor};
                ${theme.border}
                border-radius: ${theme.borderRadius};
                cursor: pointer;
                box-shadow: ${theme.boxShadow};
            }
            .paginate-prev,
            .paginate-next {
                font-family: Roboto, serif;
                font-weight: 700;
            }
            .paginate-btn.active {
                background: ${theme.defaultColor};
                color: ${theme.backgroundColor};
            }
            .paginate-btn:disabled,
            .paginate-dots:disabled,
            .paginate-prev:disabled,
            .paginate-next:disabled {
                cursor: not-allowed;
                opacity: 0.5;
            }
            
            /** Counter */
            .counter {
                width: 100%;
                margin: 20px 0;
                padding: 0 20px;
                display: flex;
                align-items: center;
                justify-content: start;
                gap: 20px;
            }
            .counter span {
                padding: 8px 16px;
                border-radius: ${theme.borderRadius};
                box-shadow: ${theme.boxShadow};
                cursor: pointer;
            }
            .counter span.active {
                color: ${theme.backgroundColor};
                background-color: ${theme.defaultColor};
            }
        </style>
    `;

    const generatePageButtons = () => {
        const buttons = [];
        if (count <= 5) {
            for (let i = 1; i <= count; i++) {
                buttons.push(createPageButton(i));
            }
        } else {
            buttons.push(createPageButton(1));
            if (currentPage > 3) {
                buttons.push(createDotsButton());
            }
            for (
                let i = Math.max(2, currentPage - 1);
                i <= Math.min(count - 1, currentPage + 1);
                i++
            ) {
                buttons.push(createPageButton(i));
            }
            if (currentPage < count - 2) {
                buttons.push(createDotsButton());
            }
            buttons.push(createPageButton(count));
        }
        return buttons;
    };

    const createPageButton = (page) => button({
        class: `paginate-btn ${page === currentPage ? "active" : ""}`,
        value: `${page}`,
        onClick: () => onPageChange(page),
    });

    const createDotsButton = () => button({
        class: "paginate-dots",
        disabled: true,
        value: "...",
    });

    const navigateTo = (path) => {
        window.history.pushState("", "", path);
    };

    let url = new URL(window.location.href);
    let searchParams = new URLSearchParams(url.search);

    searchParams.set("page", String(currentPage || 1));
    navigateTo(`${window.location.pathname}?${searchParams.toString()}`);

    return div({
        class: "paginate-block",
        value: [
            [styles],
            button({
                class: "paginate-prev",
                value: "<<<",
                onClick: () => onPageChange(currentPage > 1 ? currentPage - 1 : 1),
                disabled: currentPage === 1 || currentPage === 0,
            }),
            ...generatePageButtons(),
            button({
                class: "paginate-next",
                value: ">>>",
                onClick: () => onPageChange(currentPage < count ? currentPage + 1 : count),
                disabled: currentPage === count,
            }),
        ],
    });
};

export const parseData = (data, page) => {
    const pageSize = storage.get("pageSize");
    const totalData = data.length;
    const pages = Math.ceil(totalData / pageSize);
    if (page > pages) {
        page = pages;
    }
    const cutData = data.slice((page - 1) * pageSize, page * pageSize);

    return [pages, cutData, page, totalData];
};
