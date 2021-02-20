import {defaultValidateFn} from "../../lib/validating/index";

export const schema = [
    {
        name: 'login',
        fn: defaultValidateFn
    },
    {
        name: 'password',
        fn: defaultValidateFn
    }
];