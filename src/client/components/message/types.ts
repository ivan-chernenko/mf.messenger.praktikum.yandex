import { ChatListController } from '../../controllers/chat-list-controller';

export interface Message {
    content: string;
    id: string;
    time: string;
    userId: string;
}

export interface OldMessage {
    user_id: string;
    content: string;
    id: string;
    time: string;
}

export interface MessageProps extends Message {
    root: string;
    currentUserId?: string;
    chatListController: ChatListController;
    login?: string;
    position?: string;
}
