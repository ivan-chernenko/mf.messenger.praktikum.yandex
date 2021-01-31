export const template = `
<main class='content'>
    <section class='navigation'>
        <nav class='navigation__profile'>
            <a
                    class='link navigation__link'
                    href='/profile'
            >
                Профиль
            </a>
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
        <% _.each(chats, function(chat){ %>
            <li class='chat chat-list__chat'>
                <div class='chat__avatar'>
                </div>
                <div class='chat__description-container'>
                    <div class='chat__author'>
                        <%- chat.name %>
                    </div>
                    <div class="chat__message">
                        <%- chat.message %>
                    </div>
                </div>
            </li>
        <% }); %>
        </ul>
    </section>
    <section class='selected-chat'>
        <div class="'selected-chat__messages"'>
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
`