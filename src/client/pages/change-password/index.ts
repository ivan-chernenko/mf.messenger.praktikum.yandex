import {Component} from '../../lib/component/index.js';
import {ChangePasswordProps} from './types.js';
import {template} from './template.js';
import {render} from '../../lib/render/index.js';
import {Button} from '../../components/button/index.js';
import {Input} from '../../components/input/index.js';
import {hideLabelIfEmpty} from '../../lib/input-labels/index.js';
import {getValidationByInputName, initValidateInputs} from "../../lib/validating";

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
                name: 'password',
                type: 'password',
                labelClassName: 'change-password-form__input',
                inputClassName: '',
            }),
            repeatPassword: new Input({
                title: 'Новый пароль еще раз',
                name: 'repeatNewPassword',
                placeholder: 'Новый пароль еще раз',
                type: 'password',
                labelClassName: 'change-password-form__input',
                inputClassName: '',
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
                inputs.forEach(input => getValidationByInputName(input)())
            })
        }
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