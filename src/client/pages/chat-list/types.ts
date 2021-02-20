import {ChatProps} from "../../components/chat/index";
import {ChatListController} from "../../controllers/chat-list-controller/index";

export interface ChatListPageProps {
    chats: ChatProps[];
    chatListController: ChatListController;
    selectedChat?: number;
}