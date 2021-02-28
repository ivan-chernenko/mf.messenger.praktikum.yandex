import { template } from './template';
import { Page } from '../../lib/page';
import { Link } from '../../components/link';

export class PageNotFound extends Page<{}> {
    constructor() {
        super('not-found', {}, [
            new Link({
                root: '[data-element="not-found-return-link"]',
                href: '/profile',
                title: 'Вернуться в профиль',
            }),
        ]);
    }

    render(): string {
        return template;
    }
}
