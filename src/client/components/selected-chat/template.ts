import { placeholder } from '../../lib/placeholder';

export const template = `
    <div style='height: 100%; width: 100%;'>
    <div class='selected-chat__header'>
        <div class='selected-chat__add-user'>
            ${placeholder('add-user-input')}
            ${placeholder('add-user-button')}
        </div>
        ${placeholder('load-more')}
        <div class='selected-chat__remove-user'>
             ${placeholder('delete-user-input')}
             ${placeholder('delete-user-button')}
        </div>
    </div>
    <div class='selected-chat__messages'>
         <% _.each(messages, function(message){ %>
            <div data-element='message-<%- message.id %>'></div>
         <% }); %>
    </div>
    <form class='selected-chat__new-message-form'>
        <button class='selected-chat__attach-button'>
        </button>
        ${placeholder('new-message')}
        ${placeholder('send-message')}
    </form>
    </div>
`;
