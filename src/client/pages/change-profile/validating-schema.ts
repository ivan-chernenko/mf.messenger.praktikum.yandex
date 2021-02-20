import {defaultValidateFn, validateEmail, validatePhone} from "../../lib/validating/index";

export const schema = [
    {
        name: 'display_name',
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
        name: 'phone',
        fn: validatePhone,
    },
];