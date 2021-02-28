import { Component } from '../../lib/component';
import { ChatProps } from './types';
import { template } from './template';
import './chat.less';

export class Chat extends Component<ChatProps> {
    constructor(props: ChatProps) {
        super(props.root, props);
    }

    deleteChat = () => {
        this.props.chatListController
            .deleteChat({
                chatId: this.props.id,
            })
            .then(this.props.deleteChatSuccessCallback)
            .catch(console.log);
    };

    componentDidRender() {
        const deleteButton = this.getContent().querySelector('.chat__delete');
        this.getContent().addEventListener('click', event => {
            if (this.props.onClick) this.props.onClick(event);
        });
        if (!deleteButton) return;
        deleteButton.addEventListener('click', () => this.deleteChat());
    }

    render() {
        return template;
    }
}
