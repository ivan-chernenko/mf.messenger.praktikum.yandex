import {
    defaultValidateFn,
    validateRepeatPassword,
} from '../../lib/validating';

const validateRepeatNewPassword = validateRepeatPassword(
    '[data-name="newPassword"]',
);

export const schema = [
    {
        name: 'oldPassword',
        fn: defaultValidateFn,
    },
    {
        name: 'newPassword',
        fn: defaultValidateFn,
    },
    {
        name: 'repeatNewPassword',
        fn: validateRepeatNewPassword,
    },
];
