import {Component} from '../../lib/component/index.js';
import {RegisterPageProps} from './types.js';
import {Input} from '../../components/input/index.js';
import {Button} from '../../components/button/index.js';
import {template} from './template.js';
import {render} from '../../lib/render/index.js';
import {hideLabelIfEmpty} from '../../lib/input-labels/index.js';

export class RegisterPage extends Component<RegisterPageProps> {
    private EMAIL_REG_EXP = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
    private PHONE_REG_EXP = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g;

    constructor() {
        super('div', {
            emailValue: '',
            password: new Input({
                inputClassName: '',
                labelClassName: 'register-form__input',
                placeholder: 'Пароль',
                title: 'Пароль',
                type: 'password',
                name: 'password',
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
                name: 'repeatPassword',
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

    initValidate() {
        const inputs: NodeListOf<HTMLInputElement> = this.element.querySelectorAll('.input__input');
        if (inputs.length < 7)
            return;
        const [email, login, firstName, secondName, phone, password, repeatPassword] = Array.from(inputs);
        email.onblur = () => {
            if (!this.EMAIL_REG_EXP.test(email.value))
                email.classList.add('input__input_hasError');
        };
        email.onfocus = () => email.classList.remove('input__input_hasError');

        login.onblur = () => {
            if (!login.value)
                login.classList.add('input__input_hasError');
        };
        login.onfocus = () => login.classList.remove('input__input_hasError');

        firstName.onblur = () => {
            if (!firstName.value)
                firstName.classList.add('input__input_hasError');
        };
        firstName.onfocus = () => firstName.classList.remove('input__input_hasError');

        secondName.onblur = () => {
            if (!secondName.value)
                secondName.classList.add('input__input_hasError');
        };
        secondName.onfocus = () => secondName.classList.remove('input__input_hasError');

        phone.onblur = () => {
            if (!phone.value || !this.PHONE_REG_EXP.test(phone.value))
                phone.classList.add('input__input_hasError');
        };
        phone.onfocus = () => phone.classList.remove('input__input_hasError');

        password.onblur = () => {
            if (!password.value)
                password.classList.add('input__input_hasError');
        };
        password.onfocus = () => password.classList.remove('input__input_hasError');

        repeatPassword.onblur = () => {
            if (!repeatPassword.value || repeatPassword.value !== password.value)
                repeatPassword.classList.add('input__input_hasError');
        };
        repeatPassword.onfocus = () => repeatPassword.classList.remove('input__input_hasError');

        const button = this.element.querySelector('button');
        if (button)
            button.onclick = e => {
                e.preventDefault();
                if (!repeatPassword.value || repeatPassword.value !== password.value)
                    repeatPassword.classList.add('input__input_hasError');
                if (!password.value)
                    password.classList.add('input__input_hasError');
                if (!phone.value || !this.PHONE_REG_EXP.test(phone.value))
                    phone.classList.add('input__input_hasError');
                if (!secondName.value)
                    secondName.classList.add('input__input_hasError');
                if (!firstName.value)
                    firstName.classList.add('input__input_hasError');
                if (!login.value)
                    login.classList.add('input__input_hasError');
                if (!this.EMAIL_REG_EXP.test(email.value))
                    email.classList.add('input__input_hasError');
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