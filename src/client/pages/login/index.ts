import {Component} from '../../lib/component/index.js';
import {Input} from '../../components/input/index.js';
import {Button} from '../../components/button/index.js';
import {template} from './template.js';
import {LoginPageProps} from './types.js';
import {render} from '../../lib/render/index.js';
import {hideLabelIfEmpty} from '../../lib/input-labels/index.js';

export class LoginPage extends Component<LoginPageProps> {
    constructor() {
        super('div', {
            password: new Input({
                inputClassName: '',
                labelClassName: 'login-form__input',
                placeholder: 'Пароль',
                title: 'Пароль',
                type: 'password',
                name: 'password',
            }),
            login: new Input({
                inputClassName: '',
                labelClassName: 'login-form__input',
                placeholder: 'Логин',
                title: 'Логин',
                type: 'text',
                name: 'login',
            }),
            button: new Button({
                title: 'Зарегистрироваться',
                className: 'login-form__button',
            }),
        });
    }

    initValidate() {
        const inputs: NodeListOf<HTMLInputElement> = this.element.querySelectorAll('.input__input');
        if (inputs.length < 2)
            return;
        const [login, password] = Array.from(inputs);
        login.onblur = () => {
            if (!login.value)
                login.classList.add('input__input_hasError');
        };
        login.onfocus = () => login.classList.remove('input__input_hasError');

        password.onblur = () => {
            if (!password.value || password.value !== '123123')
                login.classList.add('input__input_hasError');
        };
        password.onfocus = () => login.classList.remove('input__input_hasError');

        const button = this.element.querySelector('button');
        if (button)
            button.onclick = e => {
                e.preventDefault();
                if (!password.value || password.value !== '123123')
                    login.classList.add('input__input_hasError');
                if (!login.value)
                    login.classList.add('input__input_hasError');
            }
    }

    componentDidMount() {
        this.initValidate();
        hideLabelIfEmpty(this.element);
    }

    render(): string {
        const templateExecutor = _.template(template);
        return templateExecutor({
            button: this.props.button.render(),
            password: this.props.password.render(),
            login: this.props.login.render(),
        });
    }
}

const loginPage = new LoginPage();

render('.app', loginPage);