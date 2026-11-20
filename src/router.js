import NotFound from "./NotFound.js";

/**
 * Ініціалізація роутера.
 * @param routes
 * @param main
 * @param message
 * @param props
 * @returns {Promise<void>}
 */
export const router = async ({routes, main, message = "", props = {}}) => {
    const renderRoute = async () => {
        const {routeComponent, props: routeProps} = useRoutes(routes);
        main.innerHTML = "";

        if (!routeComponent) {
            return;
        }

        const component = await routeComponent({
            message,
            ...props,
            ...routeProps,
        });

        main.appendChild(component);
    };

    window.addEventListener('popstate', renderRoute);
    window.renderRoute = renderRoute;

    await renderRoute();
};

const pushPage = (path, props) => {
    const {pathname, search} = window.location;
    window.history.pushState(props, "", path);

    return pathname !== window.location.pathname || search !== window.location.search;
};

const scrollPageToTop = () => window.scrollTo({top: 0, behavior: "instant"});

/**
 * Перехід без рендеру.
 * @param path
 * @param props
 */
export const navigateTo = (path, props = {}) => {
    if (pushPage(path, props)) scrollPageToTop();
};

/**
 * Перехід + рендер.
 * @param path
 * @param props
 * @returns {Promise<void>}
 */
export const navi = async (path, props = {}) => {
    const pageChanged = pushPage(path, props);
    const destination = window.location.href;
    await window.renderRoute();
    if (pageChanged && window.location.href === destination) scrollPageToTop();
};

/**
 * Порівнює URL з шаблоном route
 * і повертає параметри.
 *
 * /category/{id}
 * /category/15
 *
 * => { id: "15" }
 *
 * /category/{category_id}/product/{product_id}
 * /category/15/product/128
 *
 * => {
 *     category_id: "15",
 *     product_id: "128"
 * }
 * @param routePath
 * @param path
 * @returns {*|null}
 */
const matchRoute = (routePath, path) => {
    const keys = [];

    const pattern = routePath.replace(/\{([^}]+)}/g, (_, key) => {
        keys.push(key);

        return '([^/]+)';
    });

    const match = path.match(new RegExp(`^${pattern}$`));

    if (!match) {
        return null;
    }

    return keys.reduce((params, key, index) => {
        params[key] = decodeURIComponent(match[index + 1]);

        return params;
    }, {});
};

/**
 * Знаходить поточний route.
 * @param routes
 * @returns {{routeComponent: ((function({colors?: {backgroundColor: string, numberColor: string, textColor: string}, message?: string}): HTMLDivElement)|*), props: {}}|{routeComponent: RTCIceComponent, props: {}}}
 */
const useRoutes = (routes) => {
    const path = window.location.pathname;

    for (const route of routes) {
        const params = matchRoute(route.path, path);

        if (params !== null) {
            const props = {
                ...(window.history.state || {}),
                ...params,
            };

            if (props.title) {
                document.title = props.title;
            }

            return {
                routeComponent: route.component,
                props,
            };
        }
    }

    return {
        routeComponent: NotFound,
        props: {
            ...(window.history.state || {}),
        },
    };
};
