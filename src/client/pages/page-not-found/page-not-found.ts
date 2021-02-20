import {template} from './template';
import {Page} from '../../lib/page/index';

export class PageNotFound extends Page<{}> {
    constructor() {
        super('not-found', {});
    }

    render(): string {
        return template;
    }
}