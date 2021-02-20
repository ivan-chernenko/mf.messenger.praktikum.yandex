import {defaultValidateFn, validateRepeatPassword} from "../../lib/validating/index";

const validateRepeatNewPassword = validateRepeatPassword('[data-name="newPassword"]');

export const schema = [
    {
        name: 'oldPassword',
        fn: defaultValidateFn
    },
    {
        name: 'newPassword',
        fn: defaultValidateFn,
    },
    {
        name: 'repeatNewPassword',
        fn: validateRepeatNewPassword
    }
];