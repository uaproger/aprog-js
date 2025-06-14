import {cookie, storage} from "./storage.js";
import {button, div, GUID} from "./general.js";

export const paginate = ({ count = 0, currentPage = 1, onPageChange = () => {}, colors = {}, customStyles = {} } = {}) => {
    const defaultColors = {
        defaultColor: "#043458",
        backgroundColor: "#ffffff",
        boxShadow: "0 3px 6px 0 rgba(115,73,118, 0.4), 0 3px 6px 0 rgba(115,73,118, 0.39)",
        borderRadius: "0.5rem",
        fontSize: "16px",
        borderWidth: "0.0313rem",
        border: "border: ${theme.borderWidth} solid ${theme.defaultColor}",

        paginateBlock: {
            width: "width: 100vw",
            margin: "margin: 20px 0",
            padding: "padding: 0 20px",
            display: "display: flex",
            alignItems: "align-items: center",
            justifyContent: "justify-content: center",
            gap: "gap: 5px"
        }
    };

    const theme = { ...defaultColors, ...colors, ...customStyles };

    const styles = `
        <style>
            .paginate-block {
                ${theme.paginateBlock.width};
                ${theme.paginateBlock.margin};
                ${theme.paginateBlock.padding};
                ${theme.paginateBlock.display};
                ${theme.paginateBlock.alignItems};
                ${theme.paginateBlock.justifyContent};
                ${theme.paginateBlock.gap};
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
                ${theme.border};
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

export const __paginate = ({
    lastPage = 1,
    currentPage = 1,
    onPageChange = () => {},
    customStyles = {}
} = {}) => {
    const defaultStyles = {
        position: "relative",
        width: "100vw",
        margin: "20px 0",
        padding: "0 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "5px",
        color: "#043458",
        backgroundColor: "#ffffff",
        boxShadow: "0 3px 6px 0 rgba(115,73,118, 0.4), 0 3px 6px 0 rgba(115,73,118, 0.39)",
        borderRadius: "0.5rem",
        fontSize: "16px",
        border: "0.0313rem solid #043458",
    };

    const theme = { ...defaultStyles, ...customStyles };

    const styles = `
        <style>
            .paginate-block {
                position: ${theme.position};
                width: ${theme.width};
                margin: ${theme.margin};
                padding: ${theme.padding};
                display: ${theme.display};
                align-items: ${theme.alignItems};
                justify-content: ${theme.justifyContent};
                gap: ${theme.gap};
            }
            .paginate-btn,
            .paginate-dots,
            .paginate-prev,
            .paginate-next {
                padding: 10px 20px;
                font-size: ${theme.fontSize};
                font-weight: 600;
                color: ${theme.color};
                background: ${theme.backgroundColor};
                border: ${theme.border};
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
                background: ${theme.color};
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
                background-color: ${theme.color};
            }
        </style>
    `;

    const generatePageButtons = () => {
        const buttons = [];
        if (lastPage <= 5) {
            for (let i = 1; i <= lastPage; i++) {
                buttons.push(createPageButton(i));
            }
        } else {
            buttons.push(createPageButton(1));
            if (currentPage > 3) {
                buttons.push(createDotsButton());
            }
            for (
                let i = Math.max(2, currentPage - 1);
                i <= Math.min(lastPage - 1, currentPage + 1);
                i++
            ) {
                buttons.push(createPageButton(i));
            }
            if (currentPage < lastPage - 2) {
                buttons.push(createDotsButton());
            }
            buttons.push(createPageButton(lastPage));
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

    const navigateTo = (page) => {
        const url = new URL(window.location.href);
        const searchParams = new URLSearchParams(url.search);
        searchParams.set("page", String(page));
        window.history.pushState("", "", `${window.location.pathname}?${searchParams}`);
    };

    navigateTo(currentPage);

    return div({
        class: "paginate-block",
        value: [
            [styles],
            button({
                class: "paginate-prev",
                value: "<<<",
                onClick: () => onPageChange(currentPage > 1 ? currentPage - 1 : 1),
                disabled: currentPage === 1,
            }),
            ...generatePageButtons(),
            button({
                class: "paginate-next",
                value: ">>>",
                onClick: () => onPageChange(currentPage < lastPage ? currentPage + 1 : lastPage),
                disabled: currentPage === lastPage,
            }),
        ],
    });
};

export const __counter = ({
    perPage,
    currentPage,
    total,
    callback,
    params = [0, 1],
    counts = [10, 20, 50, 100, 200, 500],
    upText = undefined,
    downText = undefined,
    className = "",
    style = {
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "1rem"
    }
}) => {
    const from = (currentPage - 1) * perPage + 1;
    const to = Math.min(currentPage * perPage, total);

    downText = downText?.replace(/:from/g, from)?.replace(/:to/g, to)?.replace(/:all/g, total);

    return div({
        class: `${GUID()} ${className}`,
        style: style,
        value: [
            div({
                value: [
                    div({
                        style: { fontWeight: 600 },
                        value: upText || "Кількість строк в таблиці"
                    }),
                    div({
                        style: { fontSize: "10px" },
                        value: downText || `Отримано: [з ${from} по ${to}] Всього: ${total}`
                    })
                ]
            }),
            ...counts.flatMap(count => button({
                class: `${GUID()} paginate-btn ${Number(perPage) === count ? "active" : ""}`,
                value: count,
                onClick: () => {
                    cookie.set("perPage", count.toString(), 365);
                    params[0] = count;
                    params[1] = 1;
                    callback(...params);
                }
            }))
        ]
    });
};
