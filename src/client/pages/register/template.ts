export const template = `
<main class='content content_centered'>
    <form class='form register-form'>
        <h1 class='form__header'>
            Регистрация
        </h1>
        <%= email %>
        <%= login %>
        <%= firstName %>
        <%= lastName %>
        <%= phone %>
        <%= password %>
        <%= repeatPassword %>
        <%= button %>
        <a
                class='link register-form__link'
                href='/login'
        >
            Войти
        </a>
    </form>
</main>
`;