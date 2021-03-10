import { placeholder } from '../../lib/placeholder';

export const template = `
    <div>
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
         <% _.each(messages, function(message){ %>
            <div><%- message %></div>
         <% }); %>
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
    </div>
`;