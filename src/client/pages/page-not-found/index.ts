import {Component} from '../../lib/component/index.js';
import {template} from './template.js';
import {render} from '../../lib/render/index.js';

export class PageNotFound extends Component<{}> {
    constructor() {
        super('div', {});
    }

    render(): string {
        const templateExecutor = _.template(template);
        return templateExecutor();
    }
}

const pageNotFound = new PageNotFound();

render('.app', pageNotFound);