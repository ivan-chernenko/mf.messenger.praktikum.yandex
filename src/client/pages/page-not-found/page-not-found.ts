import {template} from './template';
import {Page} from '../../lib/page/index';
import {Link} from "../../components/link/index";

export class PageNotFound extends Page<{}> {
    constructor() {
        super('not-found', {}, [
            new Link({
                root: '[data-element="not-found-return-link"]',
                href: '/profile',
                title: 'Вернуться в профиль'
            })
        ]);
    }

    render(): string {
        return template;
    }
}