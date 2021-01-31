export const template = `
<label class='input <%- labelClassName %>'>
    <%- title %>
    <input
        type='<%- type %>'
        data-name='<%- name %>'
        placeholder='<%- placeholder %>'
        class='input__input <%- inputClassName %>'
    />
</label>
`;