import { HTTPTransport } from '../../lib/http-transport';
import {
    AddUserToChatRequest,
    CreateChatRequest,
    DeleteChatRequest,
    DeleteChatResponse,
    DeleteUserFormChatRequest,
    GetChatListResponse,
    GetUserByLoginRequest,
    GetUserByLoginResponse,
} from './types';

export class ChatListApi {
    private readonly headers = {
        'Content-Type': 'application/json;charset=UTF-8',
    };

    constructor(private readonly http: HTTPTransport) {}

    createChat(data: CreateChatRequest) {
        return this.http.post('chats', {
            headers: this.headers,
            data,
        });
    }

    getUserByLogin(data: GetUserByLoginRequest) {
        return this.http.post<GetUserByLoginResponse>(
            'user/search',
            {
                data,
                headers: this.headers,
            },
        );
    }

    addUser(data: AddUserToChatRequest) {
        return this.http.put('chats/users', {
            data,
            headers: this.headers,
        });
    }

    deleteUser(data: DeleteUserFormChatRequest) {
        return this.http.delete('chats/users', {
            data,
            headers: this.headers,
        });
    }

    getChatList() {
        return this.http.get<GetChatListResponse>('chats');
    }

    deleteChat(data: DeleteChatRequest) {
        return this.http.delete<DeleteChatResponse>('chats', {
            data,
            headers: this.headers,
        });
    }
}
