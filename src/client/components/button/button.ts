import { Component } from '../../lib/component';
import { ButtonProps } from './types';
import { template } from './template';
import './button.less';

export class Button extends Component<ButtonProps> {
    constructor(props: ButtonProps) {
        super(props.root, {
            ...props,
            className: props.className ?? '',
            name: props.name ?? '',
        });
    }

    handleLoading() {
        const button = this.getContent();
        const loader = button.querySelector('.button__loader');
        const buttonText = button.firstChild;
        if (!loader || !buttonText) return;
        if (this.props.loading) {
            buttonText.textContent = '';
            loader.classList.add('button__loader_visible');
        } else {
            loader.classList.remove('button__loader_visible');
            buttonText.textContent = this.props.title;
        }
    }

    onClick = (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (this.props.onClick) this.props.onClick(e);
    };

    componentDidRender() {
        const button = this.getContent();
        this.handleLoading();
        button.addEventListener('click', this.onClick);
    }

    render(): string {
        return template;
    }
}
