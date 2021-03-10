import { Component } from '../../lib/component';
import { template } from './template';
import { Button } from '../button';
import { Input } from '../input';
import { ApiError } from '../../api/login-api';
import { Router } from '../../lib/router';
import { Message, MessageComponent, OldMessage } from '../message';
import { SelectedChatProps } from './types';

export class SelectedChat extends Component<SelectedChatProps> {
    private readonly router = new Router();

    constructor(props: SelectedChatProps) {
        super(props.root, props, [
            new Button({
                root: '[data-element="delete-user-button"]',
                title: 'Удалить пользователя',
                name: 'delete-user-button',
            }),
            new Button({
                root: '[data-element="load-more"]',
                title: 'загрузить еще...',
                name: 'load-more',
            }),
            new Input({
                root: '[data-element="new-message"]',
                placeholder: 'начните вводить сообщение',
                name: 'new-message',
                inputClassName: 'selected-chat__new-message-input',
                labelClassName: 'selected-chat__new-message-input-label',
                type: 'text',
            }),
            new Button({
                root: '[data-element="send-message"]',
                title: '',
                className: 'selected-chat__send-message',
                name: 'send-message',
            }),
            new Input({
                root: '[data-element="delete-user-input"]',
                placeholder: 'Введите имя пользователя',
                name: 'delete-user-input',
                type: 'text',
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
        ]);
    }

    clear() {
        this.props.socket?.close();
        this.children = this.children.filter(ch => {
            if (ch instanceof MessageComponent) return false;
            return true;
        });
        this.setProps({
            messages: [],
        });
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
        if (login && this.props.selectedChat) {
            this.props.chatListController
                .deleteUser(
                    this.props.selectedChat,
                    (login as HTMLInputElement).value,
                )
                .catch(this.deleteOrAddUserFailed);
        }
    };

    addUser = () => {
        const login = this.getContent().querySelector(
            '[data-name="add-user-input"]',
        );
        if (login && this.props.selectedChat) {
            this.props.chatListController
                .addUser(
                    this.props.selectedChat,
                    (login as HTMLInputElement).value,
                )
                .catch(this.deleteOrAddUserFailed);
        }
    };

    sendMessage = (e: MouseEvent) => {
        e.preventDefault();
        if (!this.props.socket) {
            return;
        }
        const messageInput = document.querySelector(
            '.selected-chat__new-message-input',
        ) as HTMLInputElement;
        if (!messageInput) {
            return;
        }
        const message = messageInput.value;
        this.props.socket.send(
            JSON.stringify({
                content: message,
                type: 'message',
            }),
        );
        messageInput.value = '';
    };

    onGetNewMessages(messages: Message | OldMessage[]) {
        if (Array.isArray(messages)) {
            this.onGetOldMessages(messages);
        } else {
            this.onGetNewMessage(messages);
        }
    }

    onGetNewMessage(message: Message) {
        this.children = [
            ...this.children,
            new MessageComponent({
                ...message,
                root: `[data-element="message-${message.id}"]`,
                currentUserId: this.props.userId,
                chatListController: this.props.chatListController,
            }),
        ];
        this.setProps({ messages: [...this.props.messages, message] });
    }

    mapOldMessageToMessage = (oldMessage: OldMessage): Message => ({
        time: oldMessage.time,
        userId: oldMessage.user_id,
        id: oldMessage.id,
        content: oldMessage.content,
    });

    onGetOldMessages(oldMessages: OldMessage[]) {
        const messages = oldMessages.map(this.mapOldMessageToMessage);
        this.children = [
            ...this.children,
            ...messages.map(
                message =>
                    new MessageComponent({
                        ...message,
                        root: `[data-element="message-${message.id}"]`,
                        currentUserId: this.props.userId,
                        chatListController: this.props.chatListController,
                    }),
            ),
        ];
        this.setProps({
            messages: [...messages.reverse(), ...this.props.messages],
        });
    }

    loadMore = () => {
        this.props.socket?.send(
            JSON.stringify({
                type: 'get old',
                content: this.props.messages[0].id,
            }),
        );
    };

    componentDidRender() {
        if (!this.props.selectedChat) {
            this.hide();
        } else {
            this.show();
        }
        const addUserButton = this.children.find(
            ch => ch.getName() === 'add-user-button',
        );
        const deleteUserButton = this.children.find(
            ch => ch.getName() === 'delete-user-button',
        );
        const sendMessageButton = this.children.find(
            ch => ch.getName() === 'send-message',
        );
        const loadMoreButton = this.children.find(
            ch => ch.getName() === 'load-more',
        );
        if (
            !addUserButton ||
            !sendMessageButton ||
            !deleteUserButton ||
            !loadMoreButton
        ) {
            return;
        }
        loadMoreButton.setProps({ onClick: this.loadMore });
        addUserButton.setProps({ onClick: this.addUser });
        sendMessageButton.setProps({ onClick: this.sendMessage });
        deleteUserButton.setProps({ onClick: this.deleteUser });
    }

    render() {
        return template;
    }
}
