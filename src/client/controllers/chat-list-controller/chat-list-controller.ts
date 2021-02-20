import {ChatListApi, CreateChatRequest, DeleteChatRequest} from "../../api/chat-list-api/index";

export class ChatListController {
    constructor(private readonly chatListApi: ChatListApi) {}

    createChat(data: CreateChatRequest) {
        return this.chatListApi.createChat(data);
    }

    getChatList() {
        return this.chatListApi.getChatList();
    }

    deleteUser(chatId: number, login: string) {
        return this.chatListApi.getUserByLogin({login})
            .then(res => this.chatListApi.deleteUser({users: [res[0].id], chatId}))
    }

    addUser(chatId: number, login: string) {
        return this.chatListApi.getUserByLogin({login})
            .then(res => this.chatListApi.addUser({users: [res[0].id], chatId}));
    }

    deleteChat(data: DeleteChatRequest) {
        return this.chatListApi.deleteChat(data);
    }
}