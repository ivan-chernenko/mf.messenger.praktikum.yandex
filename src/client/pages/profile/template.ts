import { placeholder } from '../../lib/placeholder';

export const template = `
<main class='profile-content'>
        ${placeholder('profile-back')}
        <div class='profile'>
            <div class='modal-wrapper'>
                <div class='modal-wrapper__modal'>
                    <div class='modal-wrapper__title'>Загрузите фотографию</div>
                    <img class='modal-wrapper__img-holder' alt='avatar'/>
                    <input type='file' accept="image/*" class="modal-wrapper__choose-photo"/>
                    <button class='button modal-wrapper__button'>Выбрать изображение</button>
                </div>
            </div>
            <img class='avatar profile__avatar' alt='avatar'/>
            ${placeholder('profile-email')}
            ${placeholder('profile-first-name')}
            ${placeholder('profile-last-name')}
            ${placeholder('profile-login')}
            ${placeholder('profile-display-name')}
            ${placeholder('profile-phone')}
            ${placeholder('profile-change-profile')}
            ${placeholder('profile-change-password')}
            ${placeholder('profile-logout')}
        </div>
    </main>
`;
