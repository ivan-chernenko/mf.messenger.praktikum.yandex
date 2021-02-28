export const template = `
<button
    class='button <%- className %>'
    type='submit'
    name='<%- name %>'
>
    <%- title %>
    <div class='button__loader'></div>
</button>
`;
