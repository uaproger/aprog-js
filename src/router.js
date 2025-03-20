import NotFound from "./NotFound.js";

export const router = async ({ routes, main }) => {
    const renderRoute = async () => {
        const { routeComponent, props } = await useRoutes(routes);
        main.innerHTML = "";
        if (routeComponent) {
            const component = await routeComponent(props);
            main.appendChild(component);
        }
    };

    window.addEventListener('popstate', renderRoute);
    window.renderRoute = renderRoute;

    await renderRoute();
};

export const navigateTo = (path, props = {}) => {
    window.history.pushState(props, "", path);
};

export const navi = (path, props = {}) => {
    window.history.pushState(props, "", path);
    window.renderRoute().then();
};

const useRoutes = async (routes) => {
    const path = window.location.pathname;
    const matchingRoute = routes.find(route => route.path === path);
    const props = window.history.state || {};

    return matchingRoute
        ? { routeComponent: matchingRoute.component, props }
        : { routeComponent: NotFound, props };
};
