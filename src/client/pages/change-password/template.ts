import { placeholder } from '../../lib/placeholder';

export const template = `
    <main class='content'>
        ${placeholder('change-password-back')}
        <form class='change-password-form'>
            <div class='avatar change-password-form__avatar'>
            </div>
            ${placeholder('old-password')}
            ${placeholder('new-password')}
            ${placeholder('repeat-password')}
            ${placeholder('save-password-button')}
        </form>
    </main>
`;
