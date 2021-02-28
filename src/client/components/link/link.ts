import { Component } from '../../lib/component';
import { LinkProps } from './types';
import { template } from './template';
import './link.less';
import { Router } from '../../lib/router';

export class Link extends Component<LinkProps> {
    private readonly router = new Router();

    constructor(props: LinkProps) {
        super(props.root, {
            ...props,
            className: props.className ?? '',
            title: props.title ?? '',
        });
    }

    componentDidRender() {
        const root = this.getContent();
        if (root) {
            root.addEventListener('click', event => {
                event.preventDefault();
                if (this.props.onClick) {
                    this.props.onClick(event);
                }
                if (this.props.href) {
                    this.router.go(this.props.href);
                }
            });
        }
    }

    render(): string {
        return template;
    }
}
