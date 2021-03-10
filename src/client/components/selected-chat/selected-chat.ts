import { Component } from '../../lib/component';
import { template } from './template';
import { Button } from '../../components/button';
import { Input } from '../../components/input';
import { ApiError } from '../../api/login-api';
import { Router } from '../../lib/router';
import { ChatListController } from '../../controllers/chat-list-controller';

interface Message {
    content: string;
    id: string;
    time: string;
    
}

interface SelectedChatProps {
    messages: string[];
    root: string;
    socket?: WebSocket;
    selectedChat?: number;
    chatListController: ChatListController;
    name: string;
}

export class SelectedChat extends Component<SelectedChatProps> {
    private readonly router = new Router();

    constructor(props: SelectedChatProps) {
        super(props.root, props, [
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

    sendMessage = (e: MouseEvent) => {
        e.preventDefault();
        if (!this.props.socket) {
            return;
        }
        const messageInput = document.querySelector('.selected-chat__new-message-input') as HTMLInputElement;
        if (!messageInput) {
            return;
        }
        const message = messageInput.value;
        this.props.socket.send(JSON.stringify({
            content: message,
            type: 'message',
        }));
        messageInput.value = '';
    };

    componentDidRender() {
        if (!this.props.selectedChat) {
            this.hide();
        }
        else {
            this.show();
        }
        const addUserButton = this.children.find(
            ch => ch.getName() === 'add-user-button',
        );
        const deleteUserButton = this.children.find(
            ch => ch.getName() === 'delete-user-button',
        );
        const sendMessageButton = document.querySelector('.selected-chat__send-message');
        if (!addUserButton || !sendMessageButton || !deleteUserButton) {
            return;
        }
        addUserButton.setProps({ onClick: this.addUser });
        sendMessageButton.addEventListener('click', this.sendMessage);
        deleteUserButton.setProps({ onClick: this.deleteUser });
        console.log(this.props.messages)
    }

    render() {
        return template;
    }
}