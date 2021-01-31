export const template = `
<main class='content'>
        <div class='back-section'>
            <a
                    class='back-section__button'
                    href='/profile'
            >
            </a>
        </div>
        <form class='change-profile-form'>
            <div class='avatar change-profile-form__avatar'>
            </div>
            <%= email %>
            <%= firstName %>
            <%= lastName %>
            <%= login %>
            <%= displayName %>
            <%= phone %>
            <%= button %>
        </form>
    </main>
`;