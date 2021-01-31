export const template = `
    <main class='content'>
        <div class='back-section'>
            <a
                    class='back-section__button'
                    href='/profile'
            >
            </a>
        </div>
        <form class='change-password-form'>
            <div class='avatar change-password-form__avatar'>
            </div>
            <%= oldPassword %>
            <%= newPassword %>
            <%= repeatPassword %>
            <%= button %>
        </form>
    </main>
`;