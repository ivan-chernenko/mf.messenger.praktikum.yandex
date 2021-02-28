import { ChatListController } from '../../controllers/chat-list-controller';

export interface ChatProps {
    id: number;
    root: string;
    avatar?: string;
    chatName: string;
    chatListController: ChatListController;
    onClick?: (e?: MouseEvent) => void;
    deleteChatSuccessCallback: () => void;
}
