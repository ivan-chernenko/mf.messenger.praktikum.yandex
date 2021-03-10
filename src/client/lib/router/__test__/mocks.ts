import { Page } from '../../page';

export class FakePage extends Page {
    constructor() {
        super('fake', {});
    }

    render(): string {
        return '<h1 class="fake">fake</h1>';
    }
}

export class FakePage1 extends Page {
    constructor() {
        super('fake1', {});
    }

    render(): string {
        return '<h1 class="fake-1">fake 1</h1>';
    }
}
