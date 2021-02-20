import {placeholder} from "../../lib/placeholder/index";

export const template = `
<main class='content'>
        ${placeholder('change-profile-back')}
        <form class='change-profile-form'>
            ${placeholder('change-email')}
            ${placeholder('change-first-name')}
            ${placeholder('change-last-name')}
            ${placeholder('change-login')}
            ${placeholder('change-display-name')}
            ${placeholder('change-phone')}
            ${placeholder('save-profile')}
        </form>
    </main>
`;