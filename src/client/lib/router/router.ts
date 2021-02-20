import {Route} from './route';
import {Page} from "../page/index";

export class Router {
    static __instance: Router;
    private routes: Route[];
    private history: History;
    private currentRoute?: Route;
    private readonly fallThrough: Route;


    constructor(fallThrough: new () => Page<unknown>) {
        if (Router.__instance)
            return Router.__instance;
        this.fallThrough = new Route('', fallThrough);
        this.routes = [];
        this.history = window.history;
        Router.__instance = this;
    }

    use<Props = unknown>(pathname: string, block: new () => Page<Props>, props?: Props): Router {
        const route = new Route(pathname, block, props);
        this.routes.push(route);
        return this;
    }

    start() {
        window.onpopstate = () => this.onRoute(window.location.pathname);
        this.onRoute(window.location.pathname);
    }

    private onRoute(pathname: string) {
        const route = this.getRoute(pathname);
        if (this.currentRoute)
            this.currentRoute.leave();
        if (route)
            this.currentRoute = route;
        else
            this.currentRoute = this.fallThrough;
        this.currentRoute.render();
    }

    go(pathname: string) {
        this.history.pushState({}, '', pathname);
        this.onRoute(pathname);
    }

    back() {
        this.history.back();
    }

    forward() {
        this.history.forward();
    }

    private getRoute(pathname: string) {
        return this.routes.find(route => route.match(pathname));
    }
}