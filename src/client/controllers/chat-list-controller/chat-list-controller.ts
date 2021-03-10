import {
    ChatListApi,
    CreateChatRequest,
    DeleteChatRequest,
} from '../../api/chat-list-api';

export class ChatListController {
    constructor(private readonly chatListApi: ChatListApi) {}

    createChat(data: CreateChatRequest) {
        return this.chatListApi.createChat(data);
    }

    getChatList() {
        return this.chatListApi.getChatList();
    }

    deleteUser(chatId: number, login: string) {
        return this.chatListApi
            .getUserByLogin({ login })
            .then(res =>
                this.chatListApi.deleteUser({ users: [res[0].id], chatId }),
            );
    }

    addUser(chatId: number, login: string) {
        return this.chatListApi
            .getUserByLogin({ login })
            .then(res =>
                this.chatListApi.addUser({ users: [res[0].id], chatId }),
            );
    }

    deleteChat(data: DeleteChatRequest) {
        return this.chatListApi.deleteChat(data);
    }

    getToken(id: number) {
        return this.chatListApi.getToken(id);
    }

    getUserById(id: number) {
        if (isNaN(id)) debugger;
        return this.chatListApi.getUserById(id);
    }

    async connectToChatWS(chatId: number) {
        const userPromise = this.chatListApi.getUser();
        const tokenPromise = this.getToken(chatId);
        const [user, token] = await Promise.all([userPromise, tokenPromise]);
        return {
            socket: new WebSocket(
                `wss://ya-praktikum.tech/ws/chats/${user.id}/${chatId}/${token.token}`,
            ),
            id: user.id,
        };
    }
}
