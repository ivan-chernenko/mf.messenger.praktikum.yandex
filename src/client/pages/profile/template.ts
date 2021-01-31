export const template = `
<main class='content'>
        <div class='back-section'>
            <a
                    class='back-section__button'
                    href='../chat-list'
            >
            </a>
        </div>
        <div class='profile'>
            <div class='avatar profile__avatar'>
            </div>
            <div class='profile__data-row'>
                <div class='profile__data-row-label'>Почта</div>
                <div class='profile__data-row-value'>name@example.com</div>
            </div>
            <div class='profile__data-row'>
                <div class='profile__data-row-label'>Имя</div>
                <div class='profile__data-row-value'>Иван</div>
            </div>
            <div class='profile__data-row'>
                <div class='profile__data-row-label'>Фамилия</div>
                <div class='profile__data-row-value'>Черненко</div>
            </div>
            <div class='profile__data-row'>
                <div class='profile__data-row-label'>Логин</div>
                <div class='profile__data-row-value'>ivan123</div>
            </div>
            <div class='profile__data-row'>
                <div class='profile__data-row-label'>Отображаемое имя</div>
                <div class='profile__data-row-value'>ivan</div>
            </div>
            <div class='profile__data-row'>
                <div class='profile__data-row-label'>Телефон</div>
                <div class='profile__data-row-value'>+7 (915) 265 64 05</div>
            </div>
            <a
                    class='link profile__link'
                    href='../change-profile'
            >
                Изменить данные
            </a>
            <a
                    class='link profile__link'
                    href='../change-password'
            >
                Изменить пароль
            </a>
            <a
                    class='link link_color_red profile__link'
                    href='../login'
            >
                Выйти
            </a>
        </div>
    </main>
`;