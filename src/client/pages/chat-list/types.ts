import { ChatProps } from '../../components/chat';
import { ChatListController } from '../../controllers/chat-list-controller';

export interface ChatListPageProps {
    chats: ChatProps[];
    chatListController: ChatListController;
    selectedChat?: number;
}
