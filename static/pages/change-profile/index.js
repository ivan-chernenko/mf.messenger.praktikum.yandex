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
var ChangeProfilePage = /** @class */ (function (_super) {
    __extends(ChangeProfilePage, _super);
    function ChangeProfilePage() {
        return _super.call(this, 'div', {
            firstName: new Input({
                inputClassName: '',
                labelClassName: 'change-profile-form__input',
                placeholder: 'Имя',
                title: 'Имя',
                type: 'text',
                name: 'firstName',
            }),
            login: new Input({
                inputClassName: '',
                labelClassName: 'change-profile-form__input',
                placeholder: 'Логин',
                title: 'Логин',
                type: 'text',
                name: 'login',
            }),
            email: new Input({
                inputClassName: '',
                labelClassName: 'change-profile-form__input',
                placeholder: 'Почта',
                title: 'Почта',
                type: 'email',
                name: 'email',
            }),
            displayName: new Input({
                inputClassName: '',
                labelClassName: 'change-profile-form__input',
                placeholder: 'Отображаемое имя',
                title: 'Отображаемое имя',
                type: 'text',
                name: 'displayName',
            }),
            lastName: new Input({
                inputClassName: '',
                labelClassName: 'change-profile-form__input',
                placeholder: 'Фамилия',
                title: 'Фамилия',
                type: 'text',
                name: 'lastName',
            }),
            phone: new Input({
                inputClassName: '',
                labelClassName: 'change-profile-form__input',
                placeholder: 'Телефон',
                title: 'Телефон',
                type: 'tel',
                name: 'phone',
            }),
            button: new Button({
                title: 'Сохранить',
                className: 'change-profile-form__button'
            }),
        }) || this;
    }
    ChangeProfilePage.prototype.componentDidMount = function () {
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
    ChangeProfilePage.prototype.render = function () {
        var templateExecutor = _.template(template);
        return templateExecutor({
            button: this.props.button.render(),
            login: this.props.login.render(),
            displayName: this.props.displayName.render(),
            email: this.props.email.render(),
            lastName: this.props.lastName.render(),
            firstName: this.props.firstName.render(),
            phone: this.props.phone.render(),
        });
    };
    return ChangeProfilePage;
}(Component));
export { ChangeProfilePage };
var changeProfilePage = new ChangeProfilePage();
render('.app', changeProfilePage);
//# sourceMappingURL=index.js.map