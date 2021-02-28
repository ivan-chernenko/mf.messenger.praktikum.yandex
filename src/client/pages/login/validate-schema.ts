import { defaultValidateFn } from '../../lib/validating';

export const schema = [
    {
        name: 'login',
        fn: defaultValidateFn,
    },
    {
        name: 'password',
        fn: defaultValidateFn,
    },
];
