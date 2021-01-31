const EMAIL_REG_EXP = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
const PHONE_REG_EXP = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g;

export const initValidateInputs = (element: HTMLElement) => {
    const inputs: NodeListOf<HTMLInputElement> = element.querySelectorAll('.input__input');
    inputs.forEach(input => {
        input.addEventListener('blur', getValidationByInputName(input));
        input.addEventListener('focus', () => input.classList.remove('input__input_hasError'))
    })
};

export const getValidationByInputName = (input: HTMLInputElement): () => void => {
    switch (input.dataset.name) {
        case 'email':
            return () => validateEmail(input);
        case 'password':
            return () => validatePassword(input);
        case 'repeatPassword':
            const password = document.querySelector('[data-name="password"]') as HTMLInputElement;
            if (!password)
                return () => validateValueExist(input);
            return () => validateRepeatPassword(input, password);
        case 'repeatNewPassword':
            const newPassword = document.querySelector('[data-name="newPassword"]') as HTMLInputElement;
            if (!newPassword)
                return () => validateValueExist(input);
            return () => validateRepeatPassword(input, newPassword);
        case 'phone':
            return () => validatePhone(input);
        default:
            return () => validateValueExist(input)
    }
};

export const validateEmail = (input: HTMLInputElement) => {
    if (!EMAIL_REG_EXP.test(input.value))
        input.classList.add('input__input_hasError');
};

export const validatePassword = (input: HTMLInputElement) => {
    if (input.value !== '123123')
        input.classList.add('input__input_hasError');
};

export const validateRepeatPassword = (input: HTMLInputElement, passwordInput: HTMLInputElement) => {
    if (!input.value || (passwordInput && input.value !== passwordInput.value))
        input.classList.add('input__input_hasError');
};

export const validateValueExist = (input: HTMLInputElement) => {
    if (!input.value)
        input.classList.add('input__input_hasError');
};

export const validatePhone = (input: HTMLInputElement) => {
    if (!input.value || PHONE_REG_EXP.test(input.value))
        input.classList.add('input__input_hasError');
};