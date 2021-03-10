import { Component } from '../../lib/component';
import { template } from './template';
import { GetUserResponse } from '../../api/chat-list-api/types';
import { MessageProps } from './types';
import './message.less';

export class MessageComponent extends Component<MessageProps> {
    constructor(props: MessageProps) {
        super(props.root, {
            ...props,
            login: '',
            position:
                props.userId === props.currentUserId
                    ? 'message_right'
                    : 'message_left',
        });
    }

    componentDidRender() {
        if (this.props.currentUserId !== this.props.userId && !this.props.login)
            this.props.chatListController
                .getUserById(+this.props.userId)
                .then(this.getUserByIdSuccess);
    }

    getUserByIdSuccess = (res: GetUserResponse) => {
        this.setProps({ login: res.login });
    };

    render(): string {
        return template;
    }
}
