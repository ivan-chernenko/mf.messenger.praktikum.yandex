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
import { template } from './template.js';
import { render } from '../../lib/render/index.js';
import { Button } from '../../components/button/index.js';
import { Input } from '../../components/input/index.js';
import { hideLabelIfEmpty } from '../../lib/input-labels/index.js';
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
        }) || this;
    }
    ChangePasswordPage.prototype.initValidate = function () {
        var inputs = this.element.querySelectorAll('.input__input');
        if (inputs.length < 3)
            return;
        var _a = __read(Array.from(inputs), 3), oldPassword = _a[0], newPassword = _a[1], repeatPassword = _a[2];
        oldPassword.onblur = function () {
            if (!oldPassword.value || oldPassword.value !== '123123')
                oldPassword.classList.add('input__input_hasError');
        };
        oldPassword.onfocus = function () { return oldPassword.classList.remove('input__input_hasError'); };
        newPassword.onblur = function () {
            if (!newPassword.value)
                newPassword.classList.add('input__input_hasError');
        };
        newPassword.onfocus = function () { return newPassword.classList.remove('input__input_hasError'); };
        repeatPassword.onblur = function () {
            if (!repeatPassword.value || repeatPassword.value !== newPassword.value)
                repeatPassword.classList.add('input__input_hasError');
        };
        repeatPassword.onfocus = function () { return repeatPassword.classList.remove('input__input_hasError'); };
        var button = this.element.querySelector('button');
        if (button)
            button.onclick = function (e) {
                e.preventDefault();
                if (!repeatPassword.value || repeatPassword.value !== newPassword.value)
                    repeatPassword.classList.add('input__input_hasError');
                if (!newPassword.value)
                    newPassword.classList.add('input__input_hasError');
                if (!oldPassword.value || oldPassword.value !== '123123')
                    oldPassword.classList.add('input__input_hasError');
            };
    };
    ChangePasswordPage.prototype.componentDidMount = function () {
        this.initValidate();
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