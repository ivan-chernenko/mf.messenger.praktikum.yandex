export const template = `
    <div class='message <%- position %>'>
        <div class='message__body'>
            <div class='message__from'><%- login %></div>
            <div class='message__content'><%- content %></div>
        </div>
    </div>
`;
