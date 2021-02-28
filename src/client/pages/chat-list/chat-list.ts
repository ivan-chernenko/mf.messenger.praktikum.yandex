import { Page } from '../../lib/page';
import { ChatListPageProps } from './types';
import { Chat, ChatProps } from '../../components/chat';
import { Link } from '../../components/link';
import { template } from './template';
import { Input } from '../../components/input';
import { Button } from '../../components/button';
import { ChatDAO } from '../../api/chat-list-api/types';
import { ApiError } from '../../api/login-api';
import './chat-list.less';
import { Router } from '../../lib/router';

//todo: нормальный интерфейс для выбранного чата, добавления и удаления пользователей из чата

export class ChatListPage extends Page<ChatListPageProps> {
    private readonly router = new Router();

    constructor(props: ChatListPageProps) {
        super('chat-list-page', props, [
            ...props.chats.map(chat => {
                return new Chat(chat);
            }),
            new Input({
                root: '[data-element="add-user-input"]',
                placeholder: 'Введите имя пользователя',
                name: 'add-user-input',
                type: 'text',
            }),
            new Button({
                root: '[data-element="add-user-button"]',
                title: 'Добавить пользователя',
                name: 'add-user-button',
            }),
            new Input({
                root: '[data-element="new-chat-input"]',
                placeholder: 'Введите название чата',
                name: 'new-chat-input',
                type: 'text',
            }),
            new Button({
                root: '[data-element="new-chat-button"]',
                title: 'Создать новый чат',
                name: 'new-chat-button',
            }),
            new Button({
                root: '[data-element="delete-user-button"]',
                title: 'Удалить пользователя',
                name: 'delete-user-button',
            }),
            new Input({
                root: '[data-element="delete-user-input"]',
                placeholder: 'Введите имя пользователя',
                name: 'delete-user-input',
                type: 'text',
            }),
            new Link({
                root: '[data-element="chat-list-profile-link"]',
                href: '/profile',
                title: 'Профиль',
                className: 'navigation__link',
            }),
        ]);
    }

    deleteOrAddUserFailed(err: ApiError) {
        if (err.reason === 'Cookie is not valid') {
            this.router.go('/login');
        } else {
            console.error(err);
        }
    }

    deleteUser = () => {
        const login = this.getContent().querySelector(
            '[data-name="delete-user-input"]',
        );
        if (login && this.props.selectedChat)
            this.props.chatListController
                .deleteUser(
                    this.props.selectedChat,
                    (login as HTMLInputElement).value,
                )
                .catch(this.deleteOrAddUserFailed);
    };

    addUser = () => {
        const login = this.getContent().querySelector(
            '[data-name="add-user-input"]',
        );
        if (login && this.props.selectedChat)
            this.props.chatListController
                .addUser(
                    this.props.selectedChat,
                    (login as HTMLInputElement).value,
                )
                .catch(this.deleteOrAddUserFailed);
    };

    mapChatDAO = (chatDAO: ChatDAO): ChatProps => ({
        chatName: chatDAO.title,
        id: chatDAO.id,
        root: `[data-element="chat-${chatDAO.id}"]`,
        chatListController: this.props.chatListController,
        onClick: () => this.setProps({ selectedChat: chatDAO.id }),
        deleteChatSuccessCallback: this.getChats,
    });

    getChats = () => {
        this.props.chatListController
            .getChatList()
            .then(this.getChatSuccess)
            .catch(this.getChatsFailed);
    };

    getChatsFailed = (err: ApiError) => {
        if (err.reason === 'Cookie is not valid') {
            this.router.go('/login');
        } else {
            console.error(err);
        }
    };

    createChatFailed = (err: ApiError) => {
        if (err.reason === 'Cookie is not valid') {
            this.router.go('/login');
        } else {
            console.error(err);
        }
    };

    getChatSuccess = (res: ChatDAO[]) => {
        const chats = res.map(this.mapChatDAO);
        this.children = [...this.children, ...chats.map(ch => new Chat(ch))];
        if (chats.length > 0)
            this.setProps({ chats, selectedChat: chats[0].id });
        else this.setProps({ chats });
    };

    createChat = () => {
        const createChatInput = this.getContent().querySelector(
            '[data-name="new-chat-input"]',
        );
        if (!createChatInput) return;
        this.props.chatListController
            .createChat({ title: (createChatInput as HTMLInputElement).value })
            .then(this.getChats)
            .catch(this.createChatFailed);
    };

    componentDidMount() {
        this.getChats();
    }

    componentDidRender() {
        const createChatButton = this.children.find(
            ch => ch.getName() === 'new-chat-button',
        );
        const addUserButton = this.children.find(
            ch => ch.getName() === 'add-user-button',
        );
        const deleteUserButton = this.children.find(
            ch => ch.getName() === 'delete-user-button',
        );
        if (!createChatButton || !addUserButton || !deleteUserButton) return;
        createChatButton.setProps({ onClick: this.createChat });
        deleteUserButton.setProps({ onClick: this.deleteUser });
        addUserButton.setProps({ onClick: this.addUser });
    }

    render(): string {
        return template;
    }
}
