import {Component} from '../../lib/component/index.js';
import {template} from './template.js';
import {render} from '../../lib/render/index.js';

export class InternalErrorPage extends Component<{}> {
    constructor() {
        super('div', {});
    }

    render(): string {
        const templateExecutor = _.template(template);
        return templateExecutor();
    }
}

const internalErrorPage = new InternalErrorPage();

render('.app', internalErrorPage);