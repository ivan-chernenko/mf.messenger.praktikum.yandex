import {template} from './template';
import {Page} from '../../lib/page/index';
import {Link} from "../../components/link";

export class PageNotFound extends Page<{}> {
    constructor() {
        super('not-found', {}, [
            new Link({
                root: 'not-found-return-link',
                href: '/profile'
            })
        ]);
    }

    render(): string {
        return template;
    }
}