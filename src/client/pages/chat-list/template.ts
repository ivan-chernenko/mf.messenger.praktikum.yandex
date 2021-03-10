import { placeholder } from '../../lib/placeholder';

export const template = `
<main class='content chat-list-page'>
    <section class='navigation'>
        <nav class='navigation__profile'>
            ${placeholder('chat-list-profile-link')}
            <label class='input input_type_search'>
                <span class='input__search-icon'>
                </span>
                <input
                        class='input__input input__input_type_search navigation__search-input'
                        placeholder='Поиск'
                />
            </label>
        </nav>
        <ul class='chat-list'>
        ${placeholder('new-chat-input')}
        ${placeholder('new-chat-button')}
        <% _.each(chats, function(chat){ %>
            <div data-element='chat-<%- chat.id %>'></div>
        <% }); %>
        </ul>
    </section>
    <section class='selected-chat'>
       <div class="empty-selected-chat">Выберите чат</div>
       ${placeholder('selected-chat')}
    </section>
</main>
`;
