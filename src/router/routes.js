import Quick from "quickjs-component"
import { QuickRouter, createPopState } from "quickjs-router";
const router = new QuickRouter;
import Todos from "../views/Todos";
import NotFound from "../views/Notfound"
const  routes = [
    {
        path: '/',
        view: Todos,
        title: "Home",
        
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