export const template = `
<label class='input <%- labelClassName %>'>
    <%- title %>
    <input
        type='<%- type %>'
        data-name='<%- name %>'
        placeholder='<%- placeholder %>'
        class='input__input <%- inputClassName %>'
    />
    <span class='input__error-text'><%- errorText %></span>
</label>
`;
