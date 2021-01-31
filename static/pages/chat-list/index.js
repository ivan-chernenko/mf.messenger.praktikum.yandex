var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Component } from '../../lib/component/index.js';
import { template } from './template.js';
import { render } from '../../lib/render/index.js';
var chats = [
    {
        name: 'Чат',
        message: 'Сообщение',
    },
    {
        name: 'Чат',
        message: 'Сообщение',
    },
    {
        name: 'Чат',
        message: 'Сообщение',
    },
    {
        name: 'Чат',
        message: 'Сообщение',
    },
    {
        name: 'Чат',
        message: 'Сообщение',
    },
    {
        name: 'Чат',
        message: 'Сообщение',
    },
    {
        name: 'Чат',
        message: 'Сообщение',
    },
    {
        name: 'Чат',
        message: 'Сообщение',
    },
    {
        name: 'Чат',
        message: 'Сообщение',
    },
    {
        name: 'Чат',
        message: 'Сообщение',
    },
    {
        name: 'Чат',
        message: 'Сообщение',
    },
    {
        name: 'Чат',
        message: 'Сообщение',
    },
];
var ChatListPage = /** @class */ (function (_super) {
    __extends(ChatListPage, _super);
    function ChatListPage() {
        return _super.call(this, 'div', { chats: chats }) || this;
    }
    ChatListPage.prototype.render = function () {
        var templateExecutor = _.template(template);
        return templateExecutor(this.props);
    };
    return ChatListPage;
}(Component));
export { ChatListPage };
var chatListPage = new ChatListPage();
render('.app', chatListPage);
//# sourceMappingURL=index.js.map