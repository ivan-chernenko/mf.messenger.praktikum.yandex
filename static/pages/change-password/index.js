var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Component } from '../../lib/component/index.js';
import { template } from './template.js';
import { render } from '../../lib/render/index.js';
import { Button } from '../../components/button/index.js';
import { Input } from '../../components/input/index.js';
import { hideLabelIfEmpty } from '../../lib/input-labels/index.js';
import { getValidationByInputName, initValidateInputs } from "../../lib/validating";
var ChangePasswordPage = /** @class */ (function (_super) {
    __extends(ChangePasswordPage, _super);
    function ChangePasswordPage() {
        return _super.call(this, 'div', {
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
        }) || this;
    }
    ChangePasswordPage.prototype.componentDidMount = function () {
        var _this = this;
        initValidateInputs(this.element);
        var button = this.element.querySelector('button');
        if (button) {
            button.addEventListener('click', function (e) {
                e.preventDefault();
                var inputs = _this.element.querySelectorAll('.input__input');
                inputs.forEach(function (input) { return getValidationByInputName(input)(); });
            });
        }
        hideLabelIfEmpty(this.element);
    };
    ChangePasswordPage.prototype.render = function () {
        var templateExecutor = _.template(template);
        return templateExecutor({
            button: this.props.button.render(),
            repeatPassword: this.props.repeatPassword.render(),
            oldPassword: this.props.oldPassword.render(),
            newPassword: this.props.newPassword.render(),
        });
    };
    return ChangePasswordPage;
}(Component));
export { ChangePasswordPage };
var changePasswordPage = new ChangePasswordPage();
render('.app', changePasswordPage);
//# sourceMappingURL=index.js.map