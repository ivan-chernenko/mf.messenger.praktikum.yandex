import {Page} from "../page/index";

export class Route<Props = unknown> {
    block?: Page<unknown>;
    private readonly pathName: string;
    private readonly blockClass: new (props?: Props) => Page<Props>;
    private readonly props?: Props;


    constructor(
        pathName: string,
        blockClass: new (props?: Props) => Page<Props>,
        props?: Props,
    ) {
        this.pathName = pathName;
        this.blockClass = blockClass;
        this.props = props;
        this.block = undefined;
    }

    navigate(pathname: string) {
        if (this.match(pathname))
            this.render();
    }

    leave() {
        if (this.block)
            this.block.hide();
    }

    match(pathname: string) {
        return pathname === this.pathName;
    }

    render() {
        if (this.block)
            this.block.show();
        else {
            this.block = new this.blockClass(this.props);
            this.block.mount();
        }
    }
}