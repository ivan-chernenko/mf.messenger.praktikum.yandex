import {defaultValidateFn, validateEmail, validatePhone, validateRepeatPassword} from "../../lib/validating/index";

const validateRegisterRepeatPassword = validateRepeatPassword('[data-name="password"]');

export const schema = [
    {
        name: 'password',
        fn: defaultValidateFn,
    },
    {
        name: 'first_name',
        fn: defaultValidateFn,
    },
    {
        name: 'second_name',
        fn: defaultValidateFn,
    },
    {
        name: 'login',
        fn: defaultValidateFn,
    },
    {
        name: 'email',
        fn: validateEmail,
    },
    {
        name: 'repeat_password',
        fn: validateRegisterRepeatPassword,
    },
    {
        name: 'phone',
        fn: validatePhone,
    },
];