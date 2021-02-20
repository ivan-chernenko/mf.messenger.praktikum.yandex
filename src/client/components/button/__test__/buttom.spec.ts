import {Button} from "../button";
import {expect} from 'chai';
import {template} from "../template";
import * as _ from "lodash";
import * as jsdom from "jsdom";
const {JSDOM} = jsdom;

describe('button', () => {
    it('render should return template as string', () => {
        const button = new Button({
            name: 'test-button',
            title: 'test button',
            root: '.button-placeholder',
        });
        const stringTemplate = button.render();
        expect(stringTemplate).eql(template);
    });

    it('mount should mount component in placeholder', () => {
        window = new JSDOM('', {
            url: 'http://localhost:3000'
        }).window;
        window._ = _;
        const rootNode = document.createElement('div');
        const buttonPlaceHolder = document.createElement('div');
        buttonPlaceHolder.classList.add('button-placeholder');
        rootNode.classList.add('app');
        rootNode.appendChild(buttonPlaceHolder);
        document.body.appendChild(rootNode);
        const button = new Button({
            name: 'test-button',
            title: 'test button',
            root: '.button-placeholder',
        });
        button.mount();
        const buttonNode = document.querySelector('.button');
        expect(document.querySelector('.app').firstChild).eql(buttonNode);
    });

    //todo: тесты на onclick, hide, show, loading
});