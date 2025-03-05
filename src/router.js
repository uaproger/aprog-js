import NotFound from "NotFound";

const router = async ({ routes, main, message = "Page Not Found" }) => {
    const renderRoute = async () => {
        const routeComponent = await useRoutes(routes, message);
        main.innerHTML = "";
        if (routeComponent) {
            main.appendChild(routeComponent);
        }
    }
    window.addEventListener('popstate', renderRoute);
    await renderRoute();
}


const navigateTo = (path) => {
    window.history.pushState("", "", path);
}


const useRoutes = async (routes, message) => {
    const path = window.location.pathname;
    const matchingRoute = routes.find(route => route.path === path);
    return matchingRoute ? await matchingRoute.component() : NotFound(message);
}


export { router, navigateTo };
