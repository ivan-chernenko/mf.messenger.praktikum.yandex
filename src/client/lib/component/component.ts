import { isShallowEqual, PlainObject } from '../object-helpers';
import * as _ from 'lodash';

interface MetaData {
    queryToMount: string;
}

export abstract class Component<T> {
    protected element: HTMLElement;
    protected meta: MetaData;
    protected props: T & { name?: string };
    protected oldProps: T & { name?: string };
    protected children: Component<unknown>[];

    protected constructor(
        queryToMount: string,
        props: T,
        children?: Component<unknown>[],
    ) {
        this.props = this.makePropsProxy(props);
        this.oldProps = { ...this.props };
        this.meta = { queryToMount };
        this.children = children ?? [];
    }

    getName() {
        return this.props.name ?? '';
    }

    private makePropsProxy(props: T) {
        return new Proxy(props, {
            set: (target: any, p: string, value: any): boolean => {
                target[p] = value;
                if (this.shouldComponentUpdate(this.oldProps, this.props))
                    this._render();
                return true;
            },
            deleteProperty: (_: T, __: PropertyKey): boolean => {
                throw new Error("Can't delete property from private props");
            },
        });
    }

    getContent() {
        return this.element;
    }

    setProps(nextProps: Partial<T>) {
        if (!nextProps) {
            return;
        }
        this.props = Object.assign(this.props, nextProps);
    }

    componentDidMount() {}

    componentDidRender() {}

    shouldComponentUpdate(oldProps: T, newProps: T) {
        return !isShallowEqual(
            oldProps as PlainObject,
            newProps as PlainObject,
        );
    }

    mount() {
        this._render();
        this.componentDidMount();
    }

    private templateContent() {
        const templateExecutor = _.template(this.render());
        return templateExecutor(this.props).trim();
    }

    private createTemplateElement() {
        const template = document.createElement('template');
        template.innerHTML = this.templateContent();
        return template.content.firstChild;
    }

    private updateContent() {
        const content = this.createTemplateElement();
        if (!this.element || !content) {
            console.error(`can't update content of ${this.meta.queryToMount}`);
            return;
        }
        this.element.replaceWith(content);
        this.element = content as HTMLElement;
    }

    private _render() {
        const newElement = document.querySelector(
            this.meta.queryToMount,
        ) as HTMLElement;
        if (newElement) this.element = newElement;
        this.updateContent();
        this.oldProps = { ...this.props };
        this.children.forEach(c => c._render());
        this.componentDidRender();
    }

    render(): string {
        return '';
    }

    show() {
        this.element.style.removeProperty('display');
        this.componentDidMount();
    }

    hide() {
        this.element.style.display = 'none';
    }
}
