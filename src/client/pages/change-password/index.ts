import {Component} from '../../lib/component/index.js';
import {ChangePasswordProps} from './types.js';
import {template} from './template.js';
import {render} from '../../lib/render/index.js';
import {Button} from '../../components/button/index.js';
import {Input} from '../../components/input/index.js';
import {hideLabelIfEmpty} from '../../lib/input-labels/index.js';

export class ChangePasswordPage extends Component<ChangePasswordProps> {
    constructor() {
        super('div', {
            button: new Button({
                title: 'Сохранить',
                className: 'change-password-form__button'
            }),
            newPassword: new Input({
                title: 'Новый пароль',
                placeholder: 'Новый пароль',
                type: 'password',
                labelClassName: 'change-password-form__input',
                inputClassName: '',
                name: 'newPassword',
            }),
            oldPassword: new Input({
                title: 'Старый пароль',
                placeholder: 'Старый пароль',
                name: 'oldPassword',
                type: 'password',
                labelClassName: 'change-password-form__input',
                inputClassName: '',
            }),
            repeatPassword: new Input({
                title: 'Новый пароль еще раз',
                name: 'repeatPassword',
                placeholder: 'Новый пароль еще раз',
                type: 'password',
                labelClassName: 'change-password-form__input',
                inputClassName: '',
            }),
        });
    }

    initValidate() {
        const inputs: NodeListOf<HTMLInputElement> = this.element.querySelectorAll('.input__input');
        if (inputs.length < 3)
            return;
        const [oldPassword, newPassword, repeatPassword] = Array.from(inputs);
        oldPassword.onblur = () => {
            if (!oldPassword.value || oldPassword.value !== '123123')
                oldPassword.classList.add('input__input_hasError');
        };
        oldPassword.onfocus = () => oldPassword.classList.remove('input__input_hasError');

        newPassword.onblur = () => {
            if (!newPassword.value)
                newPassword.classList.add('input__input_hasError');
        };
        newPassword.onfocus = () => newPassword.classList.remove('input__input_hasError');

        repeatPassword.onblur = () => {
            if (!repeatPassword.value || repeatPassword.value !== newPassword.value)
                repeatPassword.classList.add('input__input_hasError');
        };
        repeatPassword.onfocus = () => repeatPassword.classList.remove('input__input_hasError');

        const button = this.element.querySelector('button');
        if (button)
            button.onclick = e => {
                e.preventDefault();
                if (!repeatPassword.value || repeatPassword.value !== newPassword.value)
                    repeatPassword.classList.add('input__input_hasError');
                if (!newPassword.value)
                    newPassword.classList.add('input__input_hasError');
                if (!oldPassword.value || oldPassword.value !== '123123')
                    oldPassword.classList.add('input__input_hasError');
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
            oldPassword: this.props.oldPassword.render(),
            newPassword: this.props.newPassword.render(),
        });
    }
}

const changePasswordPage = new ChangePasswordPage();

render('.app', changePasswordPage);