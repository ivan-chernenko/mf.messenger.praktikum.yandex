var EMAIL_REG_EXP = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
var PHONE_REG_EXP = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g;
export var initValidateInputs = function (element) {
    var inputs = element.querySelectorAll('.input__input');
    inputs.forEach(function (input) {
        input.addEventListener('blur', getValidationByInputName(input));
        input.addEventListener('focus', function () { return input.classList.remove('input__input_hasError'); });
    });
};
export var getValidationByInputName = function (input) {
    switch (input.dataset.name) {
        case 'email':
            return function () { return validateEmail(input); };
        case 'password':
            return function () { return validatePassword(input); };
        case 'repeatPassword':
            var password_1 = document.querySelector('[data-name="password"]');
            if (!password_1)
                return function () { return validateValueExist(input); };
            return function () { return validateRepeatPassword(input, password_1); };
        case 'repeatNewPassword':
            var newPassword_1 = document.querySelector('[data-name="newPassword"]');
            if (!newPassword_1)
                return function () { return validateValueExist(input); };
            return function () { return validateRepeatPassword(input, newPassword_1); };
        case 'phone':
            return function () { return validatePhone(input); };
        default:
            return function () { return validateValueExist(input); };
    }
};
export var validateEmail = function (input) {
    if (!EMAIL_REG_EXP.test(input.value))
        input.classList.add('input__input_hasError');
};
export var validatePassword = function (input) {
    if (input.value !== '123123')
        input.classList.add('input__input_hasError');
};
export var validateRepeatPassword = function (input, passwordInput) {
    if (!input.value || (passwordInput && input.value !== passwordInput.value))
        input.classList.add('input__input_hasError');
};
export var validateValueExist = function (input) {
    if (!input.value)
        input.classList.add('input__input_hasError');
};
export var validatePhone = function (input) {
    if (!input.value || PHONE_REG_EXP.test(input.value))
        input.classList.add('input__input_hasError');
};
//# sourceMappingURL=validate.js.map