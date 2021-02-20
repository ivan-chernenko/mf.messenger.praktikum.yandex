export const template = `
    <li class='chat chat-list__chat'>
        <div class='chat__avatar'>
        </div>
        <div class='chat__description-container'>
            <div class='chat__author'>
                <%- chatName %>
            </div>
            <div class='chat__delete'>удалить</div>
        </div>
    </li>
`;