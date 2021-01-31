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
var RegisterPage = /** @class */ (function (_super) {
    __extends(RegisterPage, _super);
    function RegisterPage() {
        var _this = _super.call(this, 'div', {
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
        }) || this;
        _this.EMAIL_REG_EXP = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
        _this.PHONE_REG_EXP = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g;
        return _this;
    }
    RegisterPage.prototype.initValidate = function () {
        var _this = this;
        var inputs = this.element.querySelectorAll('.input__input');
        if (inputs.length < 7)
            return;
        var _a = __read(Array.from(inputs), 7), email = _a[0], login = _a[1], firstName = _a[2], secondName = _a[3], phone = _a[4], password = _a[5], repeatPassword = _a[6];
        email.onblur = function () {
            if (!_this.EMAIL_REG_EXP.test(email.value))
                email.classList.add('input__input_hasError');
        };
        email.onfocus = function () { return email.classList.remove('input__input_hasError'); };
        login.onblur = function () {
            if (!login.value)
                login.classList.add('input__input_hasError');
        };
        login.onfocus = function () { return login.classList.remove('input__input_hasError'); };
        firstName.onblur = function () {
            if (!firstName.value)
                firstName.classList.add('input__input_hasError');
        };
        firstName.onfocus = function () { return firstName.classList.remove('input__input_hasError'); };
        secondName.onblur = function () {
            if (!secondName.value)
                secondName.classList.add('input__input_hasError');
        };
        secondName.onfocus = function () { return secondName.classList.remove('input__input_hasError'); };
        phone.onblur = function () {
            if (!phone.value || !_this.PHONE_REG_EXP.test(phone.value))
                phone.classList.add('input__input_hasError');
        };
        phone.onfocus = function () { return phone.classList.remove('input__input_hasError'); };
        password.onblur = function () {
            if (!password.value)
                password.classList.add('input__input_hasError');
        };
        password.onfocus = function () { return password.classList.remove('input__input_hasError'); };
        repeatPassword.onblur = function () {
            if (!repeatPassword.value || repeatPassword.value !== password.value)
                repeatPassword.classList.add('input__input_hasError');
        };
        repeatPassword.onfocus = function () { return repeatPassword.classList.remove('input__input_hasError'); };
        var button = this.element.querySelector('button');
        if (button)
            button.onclick = function (e) {
                e.preventDefault();
                if (!repeatPassword.value || repeatPassword.value !== password.value)
                    repeatPassword.classList.add('input__input_hasError');
                if (!password.value)
                    password.classList.add('input__input_hasError');
                if (!phone.value || !_this.PHONE_REG_EXP.test(phone.value))
                    phone.classList.add('input__input_hasError');
                if (!secondName.value)
                    secondName.classList.add('input__input_hasError');
                if (!firstName.value)
                    firstName.classList.add('input__input_hasError');
                if (!login.value)
                    login.classList.add('input__input_hasError');
                if (!_this.EMAIL_REG_EXP.test(email.value))
                    email.classList.add('input__input_hasError');
            };
    };
    RegisterPage.prototype.componentDidMount = function () {
        this.initValidate();
        hideLabelIfEmpty(this.element);
    };
    RegisterPage.prototype.render = function () {
        var templateExecutor = _.template(template);
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
    };
    return RegisterPage;
}(Component));
export { RegisterPage };
var registerPage = new RegisterPage();
render('.app', registerPage);
//# sourceMappingURL=index.js.map