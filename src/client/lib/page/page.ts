import {Component} from "../component/index";

export class Page<PageProps = unknown> extends Component<PageProps> {
    constructor(pageName: string, props: PageProps, children?: Component<unknown>[]) {
        const root = document.createElement('div');
        root.classList.add(pageName);
        document.querySelector('.app')?.appendChild(root);
        super(`.${pageName}`, props, children);
    }
}