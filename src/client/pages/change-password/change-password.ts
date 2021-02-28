import { Page } from '../../lib/page/index';
import { ChangePasswordProps } from './types';
import { Button } from '../../components/button';
import { Input } from '../../components/input';
import { BackSection } from '../../components/back-section';
import { ChangePasswordRequest } from '../../api/profile-api';
import { template } from './template';
import { collectFormData } from '../../lib/collect-form-data';
import { ApiError } from '../../api/login-api';
import { initValidating, validateInputs } from '../../lib/validating';
import { schema } from './validating-schema';
import './change-password.less';
import { Router } from '../../lib/router';

export class ChangePasswordPage extends Page<ChangePasswordProps> {
    private readonly router = new Router();

    constructor(props: ChangePasswordProps) {
        super('change-password', props, [
            new Button({
                root: '[data-element="save-password-button"]',
                title: 'Сохранить',
                className: 'change-password-form__button',
                name: 'change-password-button',
            }),
            new Input({
                root: '[data-element="new-password"]',
                title: 'Новый пароль',
                placeholder: 'Новый пароль',
                type: 'password',
                labelClassName: 'change-password-form__input',
                inputClassName: '',
                name: 'newPassword',
            }),
            new Input({
                root: '[data-element="old-password"]',
                title: 'Старый пароль',
                placeholder: 'Старый пароль',
                name: 'oldPassword',
                type: 'password',
                labelClassName: 'change-password-form__input',
                inputClassName: '',
            }),
            new Input({
                root: '[data-element="repeat-password"]',
                title: 'Новый пароль еще раз',
                name: 'repeatNewPassword',
                placeholder: 'Новый пароль еще раз',
                type: 'password',
                labelClassName: 'change-password-form__input',
                inputClassName: '',
            }),
            new BackSection({
                root: '[data-element="change-password-back"]',
                href: '/profile',
            }),
        ]);
    }

    changePassword = (e: MouseEvent) => {
        e.preventDefault();
        const button = this.children.find(
            ch => ch.getName() === 'change-password-button',
        );
        const form = this.element.querySelector('form');
        if (!form || !button || !validateInputs(this.children, schema)) return;
        button.setProps({ loading: true });
        const data = collectFormData<ChangePasswordRequest>(form);
        this.props.profileController
            .changePassword(data)
            .then(this.changePasswordSuccess)
            .catch(this.changePasswordFailed)
            .then(() => button.setProps({ loading: false }));
    };

    changePasswordSuccess() {
        this.router.go('/profile');
    }

    changePasswordFailed(err: ApiError) {
        if (err.reason === 'Cookie is not valid') {
            this.router.go('/login');
        } else {
            console.error(err);
        }
    }

    componentDidRender() {
        initValidating(this.children, schema);
        const button = this.children.find(
            ch => ch.getName() === 'change-password-button',
        );
        if (!button) return;
        button.setProps({ onClick: this.changePassword });
    }

    render(): string {
        return template;
    }
}
