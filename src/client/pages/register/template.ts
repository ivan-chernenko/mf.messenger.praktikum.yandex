import {placeholder} from "../../lib/placeholder/index";

export const template = `
<main class='content content_centered'>
    <form class='form register-form'>
        <h1 class='form__header'>
            Регистрация
        </h1>
        ${placeholder('register-email')}
        ${placeholder('register-login')}
        ${placeholder('register-first-name')}
        ${placeholder('register-last-name')}
        ${placeholder('register-phone')}
        ${placeholder('register-password')}
        ${placeholder('register-repeat-password')}
        ${placeholder('register-button')}
        ${placeholder('register-link')}
    </form>
</main>
`;