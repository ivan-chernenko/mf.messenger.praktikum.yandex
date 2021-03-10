import { Message } from '../message';
import { ChatListController } from '../../controllers/chat-list-controller';

export interface SelectedChatProps {
    messages: Message[];
    root: string;
    socket?: WebSocket;
    selectedChat?: number;
    chatListController: ChatListController;
    name: string;
    userId?: string;
}
