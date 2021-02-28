import { PlainObject } from './types';

export const isShallowEqual = (obj1: PlainObject, obj2: PlainObject) => {
    return (
        Object.keys(obj1).every(key => obj1[key] === obj2[key]) &&
        Object.keys(obj1).length === Object.keys(obj2).length
    );
};
