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
import { SelectedChat } from '../../components/selected-chat';

export class ChatListPage extends Page<ChatListPageProps> {
    private readonly router = new Router();

    constructor(props: ChatListPageProps) {
        super('chat-list-page', props, [
            ...props.chats.map(chat => {
                return new Chat(chat);
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
            new Link({
                root: '[data-element="chat-list-profile-link"]',
                href: '/profile',
                title: 'Профиль',
                className: 'navigation__link',
            }),
            new SelectedChat({
                root: '[data-element="selected-chat"]',
                messages: [],
                chatListController: props.chatListController,
                name: 'selected-chat',
            }),
        ]);
    }

    onCreateSocket(socket: WebSocket, chatId: number, userId: number) {
        this.openSelectedChat(userId, chatId, socket);
        socket.addEventListener('open', () => this.onSocketOpen(socket));
        socket.addEventListener('close', this.onSocketClose);
        socket.addEventListener('message', this.onGetNewMessage);
    }

    openSelectedChat(userId: number, chatId: number, socket: WebSocket) {
        const selectedChat = this.children.find(
            ch => ch.getName() === 'selected-chat',
        );
        if (!selectedChat) return;
        selectedChat.setProps({
            selectedChat: chatId,
            userId,
            socket,
        });
    }

    onSocketOpen(socket: WebSocket) {
        socket.send(
            JSON.stringify({
                content: 0,
                type: 'get old',
            }),
        );
    }

    onSocketClose = (event: CloseEvent) => {
        if (!event.wasClean) {
            if (this.props.selectedChat !== undefined) {
                this.connectToSocket(
                    this.props.selectedChat,
                ).then(({ socket }) => this.onReconnectToSocket(socket));
            }
        }
    };

    onGetNewMessage = (event: MessageEvent<string>) => {
        const selectedChat = this.children.find(
            ch => ch.getName() === 'selected-chat',
        );
        if (!selectedChat) {
            return;
        }
        const parsedData = JSON.parse(event.data);
        if (parsedData.type !== 'user connected') {
            (selectedChat as SelectedChat).onGetNewMessages(parsedData);
        }
    };

    async onChatClick(chatId: number) {
        const selectedChat = this.children.find(
            ch => ch.getName() === 'selected-chat',
        );
        if (selectedChat) {
            (selectedChat as SelectedChat).clear();
        }
        const { socket, id } = await this.connectToSocket(chatId);
        this.onCreateSocket(socket, chatId, id);
        this.setProps({
            selectedChat: chatId,
        });
    }

    mapChatDAO = (chatDAO: ChatDAO): ChatProps => ({
        chatName: chatDAO.title,
        id: chatDAO.id,
        root: `[data-element="chat-${chatDAO.id}"]`,
        chatListController: this.props.chatListController,
        onClick: () => this.onChatClick(chatDAO.id),
        deleteChatSuccessCallback: this.getChats,
    });

    onReconnectToSocket = (socket: WebSocket) => {
        const selectedChat = this.children.find(
            ch => ch.getName() === 'selected-chat',
        );
        if (!selectedChat) {
            return;
        }
        socket.addEventListener('close', this.onSocketClose);
        socket.addEventListener('message', this.onGetNewMessage);
        (selectedChat as SelectedChat).setProps({ socket });
    };

    connectToSocket = async (chatId: number) => {
        return this.props.chatListController.connectToChatWS(chatId);
    };

    getChats = () => {
        this.props.chatListController
            .getChatList()
            .then(this.getChatsSuccess)
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

    getChatsSuccess = (res: ChatDAO[]) => {
        const chats = res.map(this.mapChatDAO);
        this.children = [...this.children, ...chats.map(ch => new Chat(ch))];
        this.setProps({ chats });
    };

    createChat = () => {
        const createChatInput = this.getContent().querySelector(
            '[data-name="new-chat-input"]',
        );
        if (!createChatInput) {
            return;
        }
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
        if (!createChatButton) {
            return;
        }
        const emptySelectedChat = document.querySelector(
            '.empty-selected-chat',
        );
        if (emptySelectedChat && this.props.selectedChat) {
            (emptySelectedChat as HTMLDivElement).style.display = 'none';
        }
        createChatButton.setProps({ onClick: this.createChat });
    }

    render(): string {
        return template;
    }
}
