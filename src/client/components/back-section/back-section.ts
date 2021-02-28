import { Component } from '../../lib/component';
import { BackSectionProps } from './types';
import { template } from './template';
import { Router } from '../../lib/router';
import './back-section.less';

export class BackSection extends Component<BackSectionProps> {
    private readonly router = new Router();

    constructor(props: BackSectionProps) {
        super(props.root, props);
    }

    componentDidRender() {
        const root = this.getContent();
        if (root) {
            const link = root.querySelector('.back-section__button');
            if (link)
                link.addEventListener('click', event => {
                    event.preventDefault();
                    this.router.go(this.props.href);
                });
        }
    }

    render(): string {
        return template;
    }
}
