export interface CreateChatRequest {
    title: string;
}

export interface ChatDAO {
    title: string;
    id: number;
    avatar: string;
}

export type GetChatListResponse = ChatDAO[];

export interface DeleteChatRequest {
    chatId: number;
}

export interface DeleteChatResponse {
    userId: number;
    result: {
        id: number;
        title: string;
        avatar: string;
    }
}

export interface GetUserByLoginRequest {
    login: string;
}

export type GetUserByLoginResponse = {
    id: number;
    login: string;
    avatar: string;
    first_name: string;
    second_name: string;
    display_name: string;
    email: string;
    phone: string;
}[];

export interface AddUserToChatRequest {
    users: number[];
    chatId: number;
}

export interface DeleteUserFormChatRequest {
    users: number[];
    chatId: number;
}

