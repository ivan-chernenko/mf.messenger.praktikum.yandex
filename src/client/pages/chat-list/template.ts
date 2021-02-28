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
            <div data-element='chat-<%- chat.id%>'></div>
        <% }); %>
        </ul>
    </section>
    <section class='selected-chat'>
        <div class='selected-chat__header'>
            <div class='selected-chat__add-user'>
                ${placeholder('add-user-input')}
                ${placeholder('add-user-button')}
            </div>
            <div class='selected-chat__remove-user'>
                 ${placeholder('delete-user-input')}
                 ${placeholder('delete-user-button')}
            </div>
        </div>
        
        <div class='selected-chat__messages'>
        </div>
        <form class='selected-chat__new-message-form'>
            <button class='selected-chat__attach-button'>
            </button>
            <label class='selected-chat__new-message-input-label'>
                <input
                        class='selected-chat__new-message-input'
                        placeholder='Начните писать новое сообщение...'
                />
            </label>
            <button
                    type='submit'
                    class='selected-chat__send-message'
            >
            </button>
        </form>
    </section>
</main>
`;
