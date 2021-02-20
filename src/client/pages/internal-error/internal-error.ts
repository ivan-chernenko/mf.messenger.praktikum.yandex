import {template} from './template';
import {Page} from '../../lib/page/index';

export class InternalErrorPage extends Page<{}> {
    constructor() {
        super('internal-error', {});
    }

    render(): string {
        return template;
    }
}