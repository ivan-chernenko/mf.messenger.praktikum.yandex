export const template = `
<main class='content content_centered'>
        <form class='form login-form'>
            <h1 class='form__header'>
                Вход
            </h1>
            <%= login %>
            <%= password %>
            <%= button %>
            <a
                    class='link login-form__link'
                    href='/register'
            >
                Нет аккаунта?
            </a>
        </form>
    </main>
`;