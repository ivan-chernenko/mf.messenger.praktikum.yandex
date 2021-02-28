import { template } from './template';
import { Page } from '../../lib/page';
import { DataRow } from '../../components/data-row';
import { Link } from '../../components/link';
import { BackSection } from '../../components/back-section';
import { ProfilePageProps } from './types';
import { GetProfileResponse } from '../../api/profile-api';
import { ApiError } from '../../api/login-api';
import './profile.less';
import { Router } from '../../lib/router';

export class ProfilePage extends Page<ProfilePageProps> {
    private readonly baseUrl = 'https://ya-praktikum.tech';
    private readonly router = new Router();

    constructor(props: ProfilePageProps) {
        super('profile', props, [
            new DataRow({
                root: '[data-element="profile-email"]',
                label: 'Почта',
            }),
            new DataRow({
                root: '[data-element="profile-login"]',
                label: 'Логин',
            }),
            new DataRow({
                root: '[data-element="profile-first-name"]',
                label: 'Имя',
            }),
            new DataRow({
                root: '[data-element="profile-last-name"]',
                label: 'Фамилия',
            }),
            new DataRow({
                root: '[data-element="profile-display-name"]',
                label: 'Отображаемое имя',
            }),
            new DataRow({
                root: '[data-element="profile-phone"]',
                label: 'Телефон',
            }),
            new Link({
                root: '[data-element="profile-change-profile"]',
                className: 'profile__link',
                href: '/change-profile',
                title: 'Изменить данные',
            }),
            new Link({
                root: '[data-element="profile-change-password"]',
                className: 'profile__link',
                href: '/change-password',
                title: 'Изменить пароль',
            }),
            new Link({
                root: '[data-element="profile-logout"]',
                className: 'link_color_red profile__link',
                onClick: () => props.loginController.logout(),
                href: '/login',
                title: 'Выйти',
            }),
            new BackSection({
                root: '[data-element="profile-back"]',
                href: '/chat-list',
            }),
        ]);
    }

    changeAvatarSuccess = (res: GetProfileResponse) => {
        const modalDialogButton = this.getContent().querySelector(
            '.modal-wrapper__button',
        );
        const title = this.getContent().querySelector('.modal-wrapper__title');
        const modalWrapper = this.getContent().querySelector('.modal-wrapper');
        const avatar = this.getContent().querySelector('.profile__avatar');
        if (!modalDialogButton || !title || !modalWrapper || !avatar) return;
        modalDialogButton.removeEventListener('click', this.changeAvatar);
        modalDialogButton.addEventListener('click', this.chooseAvatar);
        modalDialogButton.textContent = 'Выбрать изображение';
        title.textContent = 'Загрузите фотографию';
        modalWrapper.classList.remove('modal-wrapper_visible');
        if (res.avatar)
            (avatar as HTMLImageElement).src = `${this.baseUrl}/${res.avatar}`;
    };

    changeAvatarFailed = (err: ApiError) => {
        if (err.reason === 'Cookie is not valid') {
            this.router.go('/login');
        } else {
            console.error(err);
        }
    };

    changeAvatar = () => {
        const formData = new FormData();
        const input = this.getContent().querySelector(
            '.modal-wrapper__choose-photo',
        );
        if (!input) return;
        const files = (input as HTMLInputElement).files;
        if (!files || files.length === 0) return;
        formData.append('avatar', files[0]);
        this.props.profileController
            .changeAvatar(formData)
            .then(this.changeAvatarSuccess)
            .catch(this.changeAvatarFailed);
    };

    chooseAvatar = () => {
        const input = this.getContent().querySelector(
            '.modal-wrapper__choose-photo',
        );
        const modalDialogButton = this.getContent().querySelector(
            '.modal-wrapper__button',
        );
        const title = this.getContent().querySelector('.modal-wrapper__title');
        if (input) {
            (input as HTMLInputElement).click();
            (input as HTMLInputElement).onchange = () => {
                if (modalDialogButton && title) {
                    modalDialogButton.removeEventListener(
                        'click',
                        this.chooseAvatar,
                    );
                    modalDialogButton.addEventListener(
                        'click',
                        this.changeAvatar,
                    );
                    modalDialogButton.textContent = 'Сохранить';
                    title.textContent = 'Фотография загружена';
                }
            };
        }
    };

    onClickOutsideModal = (e: MouseEvent) => {
        const modalWrapper = this.getContent().querySelector('.modal-wrapper');
        const modal = this.getContent().querySelector('.modal-wrapper__modal');
        if (modal && modalWrapper && !modal.contains(e.target as Node)) {
            modalWrapper.classList.remove('modal-wrapper_visible');
            document.removeEventListener('click', this.onClickOutsideModal);
        }
    };

    openModal = (e: MouseEvent) => {
        e.stopPropagation();
        const modalWrapper = this.getContent().querySelector('.modal-wrapper');
        const modalDialogButton = this.getContent().querySelector(
            '.modal-wrapper__button',
        );
        if (!modalWrapper || !modalDialogButton) return;
        modalWrapper.classList.add('modal-wrapper_visible');
        document.addEventListener('click', this.onClickOutsideModal);
        modalDialogButton.addEventListener('click', this.chooseAvatar);
    };

    componentDidRender() {
        const avatar = this.getContent().querySelector('.avatar');
        if (!avatar) return;
        avatar.addEventListener('click', this.openModal);
    }

    getProfile() {
        this.props.profileController
            .getProfile()
            .then(this.getProfileSuccess)
            .catch(this.getProfileFailed);
    }

    getProfileSuccess = (res: GetProfileResponse) => {
        const avatar = this.getContent().querySelector('.profile__avatar');
        const [
            email,
            login,
            firstName,
            lastName,
            displayName,
            phone,
        ] = this.children;
        email.setProps({ value: res.email });
        login.setProps({ value: res.login });
        firstName.setProps({ value: res.first_name });
        lastName.setProps({ value: res.second_name });
        displayName.setProps({ value: res.display_name });
        phone.setProps({ value: res.phone });
        if (res.avatar && avatar)
            (avatar as HTMLImageElement).src = `${this.baseUrl}/${res.avatar}`;
    };

    getProfileFailed = (err: ApiError) => {
        if (err.reason === 'Cookie is not valid') {
            this.router.go('/login');
        } else {
            console.error(err);
        }
    };

    componentDidMount() {
        this.getProfile();
    }

    render(): string {
        return template;
    }
}
