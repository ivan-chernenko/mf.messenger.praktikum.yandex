import {Input} from '../../components/input/index';
import {Button} from '../../components/button/index';
import {template} from './template';
import {LoginPageProps} from './types';
import {Link} from '../../components/link/index';
import {Page} from '../../lib/page/index';
import {LoginData, ApiError} from "../../api/login-api/index";
import {router} from "../../configure";
import {collectFormData} from "../../lib/collect-form-data/collect-form-data";
import {initValidating, validateInputs} from "../../lib/validating/index";
import {schema} from "./validate-schema";

export class LoginPage extends Page<LoginPageProps> {
    constructor(props: LoginPageProps) {
        super('login', props, [
            new Input({
                root: '[data-element="login-password"]',
                labelClassName: 'login-form__input',
                placeholder: 'Пароль',
                title: 'Пароль',
                type: 'password',
                name: 'password',
                errorText: 'Неправильный логин и/или пароль'
            }),
            new Input({
                root: '[data-element="login-login"]',
                labelClassName: 'login-form__input',
                placeholder: 'Логин',
                title: 'Логин',
                type: 'text',
                name: 'login',
            }),
            new Button({
                root: '[data-element="login-button"]',
                title: 'Войти',
                className: 'login-form__button',
                name: 'login-button'
            }),
            new Link({
                root: '[data-element="login-link"]',
                className: 'link login-form__link',
                href: '/register',
                title: 'Нет аккаунта?',
            }),
        ]);
    }

    loginSuccess = () => {
        router.go('/profile')
    };

    loginFailed = (err: ApiError) => {
        const password = this.children.find(ch => ch.getName() === 'password');
        if (!password)/**/
            return;
        if (err.reason === 'user already in system')
            router.go('/profile');
        else
            (password as Input).showError();
    };

    login = () => {
        const form = this.element.querySelector('form');
        const password = this.children.find(ch => ch.getName() === 'password');
        const loginButton = this.children.find(ch => ch.getName() === 'login-button');
        if (!form || !password || !loginButton || !validateInputs(this.children, schema))
            return;
        const data = collectFormData<LoginData>(form);
        loginButton.setProps({loading: true});
        this.props.loginController.login(data)
            .then(this.loginSuccess)
            .catch(this.loginFailed)
            .then(() => loginButton.setProps({loading: false}));
    };

    componentDidRender() {
        initValidating(this.children, schema);
        const loginButton = this.children.find(ch => ch.getName() === 'login-button');
        if (!loginButton)
            return;
        loginButton.setProps({onClick: this.login});
    }

    render(): string {
        return template;
    }
}