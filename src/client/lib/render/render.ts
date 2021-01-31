import {Component} from '../component/index.js';

export const render = (query: string, block: Component<any>) => {
    const root = document.querySelector(query);
    if (!root)
        throw new Error('can\'t find root element');
    root.appendChild(block.getContent());
    return root;
};