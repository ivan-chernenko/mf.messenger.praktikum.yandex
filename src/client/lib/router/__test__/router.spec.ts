import { Router } from '../router';
import { expect } from 'chai';
import { JSDOM } from 'jsdom';
import { FakePage, FakePage1 } from './mocks';

describe('router', () => {
    beforeEach(() => {
        window = (new JSDOM('', {
            url: 'http://localhost:3000',
        }).window as unknown) as Window & typeof globalThis;
        const rootNode = document.createElement('div');
        rootNode.classList.add('app');
        document.body.appendChild(rootNode);
    });

    it('should mount PageNotFound', () => {
        const router = new Router(FakePage);
        router.start();
        expect(document.querySelector('h1')?.textContent).eql('fake');
    });

    it('should mount correct page after go', () => {
        const router = new Router(FakePage);
        router.use('/test', FakePage1);
        router.start();
        router.go('/test');
        expect(document.querySelector('.fake-1')?.textContent).eql('fake 1');
        expect(
            (document.querySelector('.fake-1') as HTMLElement).style.display,
        ).eql('');
        expect(
            (document.querySelector('.fake') as HTMLElement).style.display,
        ).eql('none');
    });

    it('should mount correct page after forward and back', () => {
        const router = new Router(FakePage);
        router.use('/test', FakePage1);
        router.start();
        router.go('/test');
        router.back();
        router.forward();
        expect(document.querySelector('.fake-1')?.textContent).eql('fake 1');
        expect(
            (document.querySelector('.fake-1') as HTMLElement).style.display,
        ).eql('');
        expect(
            (document.querySelector('.fake') as HTMLElement).style.display,
        ).eql('none');
    });
});
