import { HTTPTransport } from '../../lib/http-transport';
import {
    AddUserToChatRequest,
    CreateChatRequest,
    DeleteChatRequest,
    DeleteChatResponse,
    DeleteUserFormChatRequest,
    GetChatListResponse,
    GetTokenResponse,
    GetUserByLoginRequest,
    GetUserByLoginResponse,
    GetUserResponse,
} from './types';
import { GetProfileResponse } from '../profile-api';

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

    getUserById(id: number) {
        return this.http.get<GetUserResponse>(`user/${id}`);
    }

    getUserByLogin(data: GetUserByLoginRequest) {
        return this.http.post<GetUserByLoginResponse>('user/search', {
            data,
            headers: this.headers,
        });
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

    getToken(id: number) {
        return this.http.post<GetTokenResponse>(`chats/token/${id}`, {
            headers: this.headers,
        });
    }

    getUser() {
        return this.http.get<GetProfileResponse>('auth/user');
    }
}
