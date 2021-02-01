import {Component} from '../../lib/component/index.js';
import {RegisterPageProps} from './types.js';
import {Input} from '../../components/input/index.js';
import {Button} from '../../components/button/index.js';
import {template} from './template.js';
import {render} from '../../lib/render/index.js';
import {hideLabelIfEmpty} from '../../lib/input-labels/index.js';
import {validateFieldByName, initValidateInputs} from "../../lib/validating/index.js";

export class RegisterPage extends Component<RegisterPageProps> {
    constructor() {
        super('div', {
            emailValue: '',
            password: new Input({
                inputClassName: '',
                labelClassName: 'register-form__input',
                placeholder: 'Пароль',
                title: 'Пароль',
                type: 'password',
                name: 'newPassword',
            }),
            firstName: new Input({
                inputClassName: '',
                labelClassName: 'register-form__input',
                placeholder: 'Имя',
                title: 'Имя',
                type: 'text',
                name: 'firstName',
            }),
            login: new Input({
                inputClassName: '',
                labelClassName: 'register-form__input',
                placeholder: 'Логин',
                title: 'Логин',
                type: 'text',
                name: 'login',
            }),
            email: new Input({
                inputClassName: '',
                labelClassName: 'register-form__input',
                placeholder: 'Почта',
                title: 'Почта',
                type: 'email',
                name: 'email',
            }),
            repeatPassword: new Input({
                inputClassName: '',
                labelClassName: 'register-form__input',
                placeholder: 'Пароль еще раз',
                title: 'Пароль еще раз',
                type: 'password',
                name: 'repeatNewPassword',
            }),
            lastName: new Input({
                inputClassName: '',
                labelClassName: 'register-form__input',
                placeholder: 'Фамилия',
                title: 'Фамилия',
                type: 'text',
                name: 'lastName',
            }),
            phone: new Input({
                inputClassName: '',
                labelClassName: 'register-form__input',
                placeholder: 'Телефон',
                title: 'Телефон',
                type: 'tel',
                name: 'phone',
            }),
            button: new Button({
                title: 'Зарегистрироваться',
                className: 'register-form__button'
            }),
        });
    }


    componentDidMount() {
        initValidateInputs(this.element);
        const button = this.element.querySelector('button');
        if (button) {
            button.addEventListener('click', e => {
                e.preventDefault();
                const inputs: NodeListOf<HTMLInputElement> = this.element.querySelectorAll('.input__input');
                inputs.forEach(input => validateFieldByName(input))
            })
        }
        hideLabelIfEmpty(this.element);
    }

    render(): string {
        const templateExecutor = _.template(template);
        return templateExecutor({
            button: this.props.button.render(),
            repeatPassword: this.props.repeatPassword.render(),
            password: this.props.password.render(),
            login: this.props.login.render(),
            email: this.props.email.render(),
            lastName: this.props.lastName.render(),
            firstName: this.props.firstName.render(),
            phone: this.props.phone.render(),
        });
    }
}

const registerPage = new RegisterPage();

render('.app', registerPage);