import Quick from "quickjs-component"
import { QuickRouter, createPopState } from "quickjs-router";
const router = new QuickRouter;
import App from "../views/App"
import About from "../views/About"
import NotFound from "../views/Notfound"
const  routes = [
    {
        path: '/',
        view: App,
        title: "Home",
        
    },
    {
        path: '/about',
        title: "About",
        view: About
    },
    {
        path: '/error',
        view: NotFound,
        title: "Page Not Found",
    },
];

Quick.runBeforeDomLoaded(router.useRoute(routes));
router.createNavigation(routes)
createPopState(routes)
export default routes