import { placeholder } from '../../lib/placeholder';

export const template = `
<main class='content content_centered content_column not-found'>
    <h1>404</h1>
    <h2>Страница не найдена :(</h2>
    ${placeholder('not-found-return-link')}
</main>
`;
