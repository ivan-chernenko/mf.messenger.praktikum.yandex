import {Component} from "../../lib/component/index";
import {LinkProps} from "./types";
import {template} from "./template";
import {router} from "../../configure";

export class Link extends Component<LinkProps>{
    constructor(props: LinkProps) {
        super(props.root, {
            ...props,
            className: props.className ?? '',
            title: props.title ?? ''
        });
    }

    componentDidRender() {
        const root = this.getContent();
        if (root) {
            root.addEventListener('click', event => {
                event.preventDefault();
                if (this.props.onClick)
                    this.props.onClick(event);
                if (this.props.href)
                    router.go(this.props.href);
            });
        }
    }

    render(): string {
        return template;
    }
}