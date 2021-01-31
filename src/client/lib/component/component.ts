import {shallowEquals} from '../shallow-equal/index.js';
import {EventBus} from '../event-bus/index.js';
import {EVENTS} from './events.js';

interface MetaData {
    tagName: string;
}

export abstract class Component<T> {
    protected element: HTMLElement;
    protected readonly meta: MetaData;
    protected readonly props: T;
    protected readonly eventBus: EventBus;

    protected constructor(tagName = 'div', props: T) {
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

    private registerEvents(eventBus: EventBus) {
        eventBus.on(EVENTS.INIT, this.init);
        eventBus.on(EVENTS.FLOW_CDM, this._componentDidMount);
        eventBus.on(EVENTS.FLOW_CDU, this._componentDidUpdate);
        eventBus.on(EVENTS.FLOW_RENDER, this._render);
    }

    private makePropsProxy = (props: T) => new Proxy(props, {
        set: (target: any, p: string, value: any): boolean => {
            const oldProps = {...target};
            target[p] = value;
            this.eventBus.emit(EVENTS.FLOW_CDU, oldProps, target);
            return true;
        },
        deleteProperty: (_: T, __: PropertyKey): boolean => {
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

    setProps = (nextProps: Partial<T>) => {
        if (!nextProps) {
            return;
        }
        Object.assign(this.props, nextProps);
    };

    private _componentDidMount = () => {
        this.componentDidMount(this.props);
    };

    componentDidMount(_: T) {};

    private _componentDidUpdate = (oldProps: T, newProps: T) => {
        const isComponentNeedToBeUpdate = this.componentDidUpdate(oldProps, newProps);
        if (isComponentNeedToBeUpdate)
            this.eventBus.emit(EVENTS.FLOW_RENDER);
    };

    componentDidUpdate(oldProps: T, newProps: T) {
        return !shallowEquals(oldProps, newProps);
    };

    private _render = () => {
        this.element.insertAdjacentHTML("afterbegin", this.render());
    };

    render(): string {
        return '';
    };

    show = () => {
        this.element.style.visibility = 'visible';
    };

    hide = () => {
        this.element.style.visibility = 'hidden';
    };
}