import {Router} from "../router";
import {PageNotFound} from "../../../pages/page-not-found";
import * as _ from "lodash";
import {expect} from 'chai';
import {InternalErrorPage} from "../../../pages/internal-error";
import * as jsdom from "jsdom";
const { JSDOM } = jsdom;

describe('router', () => {
    beforeEach(() => {
        window = new JSDOM('', {
            url: 'http://localhost:3000'
        }).window;
        window._ = _;
        const rootNode = document.createElement('div');
        rootNode.classList.add('app');
        document.body.appendChild(rootNode);
    });

    it('should mount PageNotFound', () => {
        const router = new Router(PageNotFound);
        router.start();
        expect(document.querySelector('.content')).exist;
        expect(document.querySelector('h1').textContent).eql('404');
    });

    it('should mount correct page after go', () => {
        const router = new Router(PageNotFound);
        router.use('/test', InternalErrorPage);
        router.start();
        router.go('/test');
        expect(document.querySelector('.internal-error').textContent)
            .eql('\n    500\n    Упс, ошибка сервера.\n');
        expect((document.querySelector('.internal-error') as HTMLElement).style.display).eql('');
        expect((document.querySelector('.not-found') as HTMLElement).style.display).eql('none');
    });

    it('should mount correct page after forward and back', () => {
        const router = new Router(PageNotFound);
        router.use('/test', InternalErrorPage);
        router.start();
        router.go('/test');
        router.back();
        router.forward();
        expect(document.querySelector('.internal-error').textContent)
            .eql('\n    500\n    Упс, ошибка сервера.\n');
        expect((document.querySelector('.internal-error') as HTMLElement).style.display).eql('');
        expect((document.querySelector('.not-found') as HTMLElement).style.display).eql('none');
    });
});