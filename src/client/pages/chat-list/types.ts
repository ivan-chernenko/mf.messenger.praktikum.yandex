import { ChatProps } from '../../components/chat';
import { ChatListController } from '../../controllers/chat-list-controller';
import { Message } from '../../components/message';

export interface ChatListPageProps {
    chats: ChatProps[];
    chatListController: ChatListController;
    selectedChat?: number;
    messages: Message[];
}
