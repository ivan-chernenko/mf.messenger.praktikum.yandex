import {EventBus} from '../event-bus';
import {shallowEquals} from "../shallow-equal";
import {EVENTS} from "./events";

interface MetaData<T> {
    tagName: string;
}

export abstract class Component<T> {
    private element: HTMLElement;
    private readonly meta: MetaData<T>;
    private readonly props: T;
    private readonly eventBus: EventBus;

    protected constructor(tagName = "div", props: T) {
        const eventBus = new EventBus();
        this.meta = {tagName};
        this.props = this.makePropsProxy(props);
        this.registerEvents(eventBus);
        this.eventBus = eventBus;
        eventBus.emit(EVENTS.INIT);
    }

    private init = () => {
        this.createResources();
        this.eventBus.emit(EVENTS.FLOW_RENDER);
        this.eventBus.emit(EVENTS.FLOW_CDM);
    };

    private registerEvents(eventBus) {
        eventBus.on(EVENTS.INIT, this.init);
        eventBus.on(EVENTS.FLOW_CDM, this._componentDidMount);
        eventBus.on(EVENTS.FLOW_CDU, this._componentDidUpdate);
        eventBus.on(EVENTS.FLOW_RENDER, this._render);
    }

    private makePropsProxy = (props) => new Proxy(props, {
        set: (target: any, p: string, value: any): boolean => {
            const oldProps = {...target};
            target[p] = value;
            this.eventBus.emit(EVENTS.FLOW_CDU, oldProps, target);
            return true;
        },
        deleteProperty: (target: T, p: PropertyKey): boolean => {
            throw new Error('нет доступ');
        }
    });


    private createResources = () => {
        const {tagName} = this.meta;
        this.element = document.createElement(tagName);
    };

    getContent = () => {
        return this.element;
    };

    setProps = (nextProps: T) => {
        if (!nextProps) {
            return;
        }
        Object.assign(this.props, nextProps);
    };

    private _componentDidMount = () => {
        this.componentDidMount(this.props);
    };

    componentDidMount = (oldProps: T) => {
    };

    private _componentDidUpdate = (oldProps, newProps) => {
        const isComponentNeedToBeUpdate = this.componentDidUpdate(oldProps, newProps);
        if (isComponentNeedToBeUpdate)
            this.eventBus.emit(EVENTS.FLOW_RENDER);
    };

    componentDidUpdate = (oldProps, newProps) => {
        return !shallowEquals(oldProps, newProps);
    };

    private _render = () => {
        this.element.innerHTML = this.render();
    };

    render(): string {
        return ''
    };

    show = () => {
        this.element.style.visibility = 'visible';
    };

    hide = () => {
        this.element.style.visibility = 'hidden';
    };
}