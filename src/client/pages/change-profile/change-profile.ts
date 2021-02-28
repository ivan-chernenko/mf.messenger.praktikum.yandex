import { ChangeProfilePageProps } from './types';
import { Input } from '../../components/input';
import { Button } from '../../components/button';
import { template } from './template';
import { Page } from '../../lib/page';
import { BackSection } from '../../components/back-section';
import {
    ChangeProfileRequest,
    GetProfileResponse,
} from '../../api/profile-api';
import { collectFormData } from '../../lib/collect-form-data';
import { ApiError } from '../../api/login-api';
import { schema } from './validating-schema';
import { initValidating, validateInputs } from '../../lib/validating';
import './change-profile.less';
import { Router } from '../../lib/router';

export class ChangeProfilePage extends Page<ChangeProfilePageProps> {
    private readonly router = new Router();

    constructor(props: ChangeProfilePageProps) {
        super('change-profile', props, [
            new Input({
                root: '[data-element="change-first-name"]',
                inputClassName: '',
                labelClassName: 'change-profile-form__input',
                placeholder: 'Имя',
                title: 'Имя',
                type: 'text',
                name: 'first_name',
            }),
            new Input({
                root: '[data-element="change-login"]',
                inputClassName: '',
                labelClassName: 'change-profile-form__input',
                placeholder: 'Логин',
                title: 'Логин',
                type: 'text',
                name: 'login',
            }),
            new Input({
                root: '[data-element="change-email"]',
                inputClassName: '',
                labelClassName: 'change-profile-form__input',
                placeholder: 'Почта',
                title: 'Почта',
                type: 'email',
                name: 'email',
            }),
            new Input({
                root: '[data-element="change-display-name"]',
                inputClassName: '',
                labelClassName: 'change-profile-form__input',
                placeholder: 'Отображаемое имя',
                title: 'Отображаемое имя',
                type: 'text',
                name: 'display_name',
            }),
            new Input({
                root: '[data-element="change-last-name"]',
                inputClassName: '',
                labelClassName: 'change-profile-form__input',
                placeholder: 'Фамилия',
                title: 'Фамилия',
                type: 'text',
                name: 'second_name',
            }),
            new Input({
                root: '[data-element="change-phone"]',
                inputClassName: '',
                labelClassName: 'change-profile-form__input',
                placeholder: 'Телефон',
                title: 'Телефон',
                type: 'tel',
                name: 'phone',
            }),
            new Button({
                root: '[data-element="save-profile"]',
                title: 'Сохранить',
                className: 'change-profile-form__button',
                name: 'change-profile-button',
            }),
            new BackSection({
                root: '[data-element="change-profile-back"]',
                href: '/profile',
            }),
        ]);
    }

    changeProfile = (e: MouseEvent) => {
        const form = this.element.querySelector('form');
        const button = this.children.find(
            ch => ch.getName() === 'change-profile-button',
        );
        e.preventDefault();
        if (!form || !button || !validateInputs(this.children, schema)) {
            return;
        }
        button.setProps({ loading: true });
        const data = collectFormData<ChangeProfileRequest>(form);
        this.props.profileController
            .changeProfile(data)
            .then(this.changeProfileSuccess)
            .catch(this.changeProfileFailed)
            .then(() => button.setProps({ loading: false }));
    };

    changeProfileSuccess = () => {
        this.router.go('/profile');
    };

    changeProfileFailed = (err: ApiError) => {
        if (err.reason === 'Cookie is not valid') {
            this.router.go('/login');
        } else {
            console.error(err);
        }
    };

    getProfileSuccess = (res: GetProfileResponse) => {
        const [
            firstName,
            login,
            email,
            displayName,
            lastName,
            phone,
        ] = this.children;
        email.setProps({ value: res.email });
        login.setProps({ value: res.login });
        firstName.setProps({ value: res.first_name });
        lastName.setProps({ value: res.second_name });
        displayName.setProps({ value: res.display_name });
        phone.setProps({ value: res.phone });
    };

    getProfileFailed = (err: ApiError) => {
        if (err.reason === 'Cookie is not valid') {
            this.router.go('/login');
        } else {
            console.error(err);
        }
    };

    getProfile() {
        this.props.profileController
            .getProfile()
            .then(this.getProfileSuccess)
            .catch(this.getProfileFailed);
    }

    componentDidRender() {
        const button = this.children.find(
            ch => ch.getName() === 'change-profile-button',
        );
        if (!button) return;
        button.setProps({ onClick: this.changeProfile });
    }

    componentDidMount() {
        initValidating(this.children, schema);
        this.getProfile();
    }

    render(): string {
        return template;
    }
}
