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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
import { Component } from '../../lib/component/index.js';
import { Input } from '../../components/input/index.js';
import { Button } from '../../components/button/index.js';
import { template } from './template.js';
import { render } from '../../lib/render/index.js';
import { hideLabelIfEmpty } from '../../lib/input-labels/index.js';
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
    LoginPage.prototype.initValidate = function () {
        var inputs = this.element.querySelectorAll('.input__input');
        if (inputs.length < 2)
            return;
        var _a = __read(Array.from(inputs), 2), login = _a[0], password = _a[1];
        login.onblur = function () {
            if (!login.value)
                login.classList.add('input__input_hasError');
        };
        login.onfocus = function () { return login.classList.remove('input__input_hasError'); };
        password.onblur = function () {
            if (!password.value || password.value !== '123123')
                login.classList.add('input__input_hasError');
        };
        password.onfocus = function () { return login.classList.remove('input__input_hasError'); };
        var button = this.element.querySelector('button');
        if (button)
            button.onclick = function (e) {
                e.preventDefault();
                if (!password.value || password.value !== '123123')
                    login.classList.add('input__input_hasError');
                if (!login.value)
                    login.classList.add('input__input_hasError');
            };
    };
    LoginPage.prototype.componentDidMount = function () {
        this.initValidate();
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