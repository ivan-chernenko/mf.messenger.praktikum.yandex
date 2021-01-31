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
import { Input } from '../../components/input/index.js';
import { Button } from '../../components/button/index.js';
import { template } from './template.js';
import { render } from '../../lib/render/index.js';
import { hideLabelIfEmpty } from '../../lib/input-labels/index.js';
import { getValidationByInputName, initValidateInputs } from "../../lib/validating";
var LoginPage = /** @class */ (function (_super) {
    __extends(LoginPage, _super);
    function LoginPage() {
        return _super.call(this, 'div', {
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
        }) || this;
    }
    LoginPage.prototype.componentDidMount = function () {
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
    LoginPage.prototype.render = function () {
        var templateExecutor = _.template(template);
        return templateExecutor({
            button: this.props.button.render(),
            password: this.props.password.render(),
            login: this.props.login.render(),
        });
    };
    return LoginPage;
}(Component));
export { LoginPage };
var loginPage = new LoginPage();
render('.app', loginPage);
//# sourceMappingURL=index.js.map