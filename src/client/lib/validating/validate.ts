const EMAIL_REG_EXP = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
const PHONE_REG_EXP = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g;

export const initValidateInputs = (element: HTMLElement) => {
    const inputs: NodeListOf<HTMLInputElement> = element.querySelectorAll('.input__input');
    inputs.forEach(input => {
        if (input.dataset.name !== 'password')
            input.addEventListener('blur', () => validateFieldByName(input));
        input.addEventListener('focus', () => input.classList.remove('input__input_hasError'))
    })
};

export const validateFieldByName = (input: HTMLInputElement) => {
    switch (input.dataset.name) {
        case 'email':
            return validateEmail(input);
        case 'password':
            return validatePassword(input);
        case 'repeatNewPassword':
            return validateRepeatNewPassword(input);
        case 'phone':
            return validatePhone(input);
        default:
            return validateValueExist(input)
    }
};

const validateEmail = (input: HTMLInputElement) => {
    if (!EMAIL_REG_EXP.test(input.value))
        input.classList.add('input__input_hasError');
};

const validatePassword = (input: HTMLInputElement) => {
    if (input.value !== '123123')
        input.classList.add('input__input_hasError');
};

const validateRepeatNewPassword = (input: HTMLInputElement) => {
    const newPassword = document.querySelector('[data-name="newPassword"]') as HTMLInputElement;
    if (!newPassword)
        return validateValueExist(input);
    if (!input.value || (newPassword && input.value !== newPassword.value))
        input.classList.add('input__input_hasError');
};

const validateValueExist = (input: HTMLInputElement) => {
    if (!input.value)
        input.classList.add('input__input_hasError');
};

const validatePhone = (input: HTMLInputElement) => {
    if (!input.value || PHONE_REG_EXP.test(input.value))
        input.classList.add('input__input_hasError');
};