import {RegisterPageProps} from './types';
import {Input} from '../../components/input/index';
import {Button} from '../../components/button/index';
import {template} from './template';
import {Link} from '../../components/link/index';
import {Page} from '../../lib/page/index';
import {RegisterData} from "../../api/login-api/index";
import {router} from "../../configure";
import {collectFormData} from "../../lib/collect-form-data/index";
import {schema} from "./validating-schema";
import {initValidating, validateInputs} from "../../lib/validating/index";

export class RegisterPage extends Page<RegisterPageProps> {
    constructor(props: RegisterPageProps) {
        super('register', props, [
            new Input({
                root: '[data-element="register-password"]',
                inputClassName: '',
                labelClassName: 'register-form__input',
                placeholder: 'Пароль',
                title: 'Пароль',
                type: 'password',
                name: 'password',
            }),
            new Input({
                root: '[data-element="register-first-name"]',
                inputClassName: '',
                labelClassName: 'register-form__input',
                placeholder: 'Имя',
                title: 'Имя',
                type: 'text',
                name: 'first_name',
            }),
            new Input({
                root: '[data-element="register-login"]',
                inputClassName: '',
                labelClassName: 'register-form__input',
                placeholder: 'Логин',
                title: 'Логин',
                type: 'text',
                name: 'login',
            }),
            new Input({
                root: '[data-element="register-email"]',
                inputClassName: '',
                labelClassName: 'register-form__input',
                placeholder: 'Почта',
                title: 'Почта',
                type: 'email',
                name: 'email',
            }),
            new Input({
                root: '[data-element="register-repeat-password"]',
                inputClassName: '',
                labelClassName: 'register-form__input',
                placeholder: 'Пароль еще раз',
                title: 'Пароль еще раз',
                type: 'password',
                name: 'repeat_password',
            }),
            new Input({
                root: '[data-element="register-last-name"]',
                inputClassName: '',
                labelClassName: 'register-form__input',
                placeholder: 'Фамилия',
                title: 'Фамилия',
                type: 'text',
                name: 'second_name',
            }),
            new Input({
                root: '[data-element="register-phone"]',
                inputClassName: '',
                labelClassName: 'register-form__input',
                placeholder: 'Телефон',
                title: 'Телефон',
                type: 'tel',
                name: 'phone',
            }),
            new Button({
                root: '[data-element="register-button"]',
                title: 'Зарегистрироваться',
                className: 'register-form__button',
                name: 'register-button',
            }),
            new Link({
                root: '[data-element="register-link"]',
                className: 'link register-form__link',
                href: '/login',
                title: 'Войти'
            })
        ]);
    }

    register = () => {
        const registerButton = this.children.find(ch => ch.getName() === 'register-button');
        const form = this.element.querySelector('form');
        if (!form || !registerButton || !validateInputs(this.children, schema))
            return;
        const data = collectFormData<RegisterData>(form);
        registerButton.setProps({loading: true});
        this.props.loginController.register(data)
            .then(this.registerSuccess)
            .catch(e => console.log(e))
            .then(() => registerButton.setProps({loading: false}))
    };

    registerSuccess() {
        router.go('/profile');
    }

    componentDidRender() {
        const registerButton = this.children.find(ch => ch.getName() === 'register-button');
        initValidating(this.children, schema);
        if (!registerButton)
            return;
        registerButton.setProps({onClick: this.register});
    }

    render(): string {
        return template;
    }
}