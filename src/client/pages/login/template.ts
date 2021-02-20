import {placeholder} from "../../lib/placeholder/index";

export const template = `
<main class='content content_centered'>
        <form class='form login-form'>
            <h1 class='form__header'>
                Войти
            </h1>
            ${placeholder('login-login')}
            ${placeholder('login-password')}
            ${placeholder('login-button')}
            ${placeholder('login-link')}
        </form>
    </main>
`;