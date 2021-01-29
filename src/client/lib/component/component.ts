import {shallowEquals} from "../shallow-equal";

interface MetaData<T> {
    tagName: string;
}

export abstract class Component<T> {
    private element: HTMLElement;
    private readonly meta: MetaData<T>;
    private readonly props: T;

    protected constructor(tagName = "div", props: T) {
        this.meta = {tagName};
        this.props = this.makePropsProxy(props);
        this.init();
    }

    private init = () => {
        this.createResources();
    };

    private makePropsProxy = (props) => new Proxy(props, {
        set: (target: any, p: string, value: any): boolean => {
            const oldProps = {...target};
            target[p] = value;
            this._componentDidUpdate(oldProps, target);
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

    setProps = (props: T) => {
        if (props) {
            Object.assign(this.props, props);
        }
    };

    private _componentDidMount = () => {
        this.componentDidMount(this.props);
    };

    componentDidMount = (props: T) => {
    };

    private _componentDidUpdate = (oldProps, newProps) => {
        const isComponentNeedToBeUpdate = this.componentDidUpdate(oldProps, newProps);
        if (isComponentNeedToBeUpdate)
            this._render();
    };

    componentDidUpdate = (oldProps, newProps) => {
        return !shallowEquals(oldProps, newProps);
    };

    private _render = () => {
        Handlebars.compile(this.render())
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