import {Component} from '../../lib/component/index.js';
import {template} from './template.js';
import {render} from '../../lib/render/index.js';
import {Chat, ChatListPageProps} from './types.js';

const chats: Chat[] = [
    {
        name: 'Чат',
        message: 'Сообщение',
    },
    {
        name: 'Чат',
        message: 'Сообщение',
    },
    {
        name: 'Чат',
        message: 'Сообщение',
    },
    {
        name: 'Чат',
        message: 'Сообщение',
    },
    {
        name: 'Чат',
        message: 'Сообщение',
    },
    {
        name: 'Чат',
        message: 'Сообщение',
    },
    {
        name: 'Чат',
        message: 'Сообщение',
    },
    {
        name: 'Чат',
        message: 'Сообщение',
    },
    {
        name: 'Чат',
        message: 'Сообщение',
    },
    {
        name: 'Чат',
        message: 'Сообщение',
    },
    {
        name: 'Чат',
        message: 'Сообщение',
    },
    {
        name: 'Чат',
        message: 'Сообщение',
    },
]

export class ChatListPage extends Component<ChatListPageProps> {
    constructor() {
        super('div', {chats});
    }

    render(): string {
        const templateExecutor = _.template(template);
        return templateExecutor(this.props);
    }
}

const chatListPage = new ChatListPage();

render('.app', chatListPage);