import {Component} from '../../lib/component/index';
import {BackSectionProps} from './types';
import {template} from "./template";
import {router} from "../../configure";

export class BackSection extends Component<BackSectionProps> {
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
                    router.go(this.props.href);
                });
        }
    }

    render(): string {
        return template;
    }
}