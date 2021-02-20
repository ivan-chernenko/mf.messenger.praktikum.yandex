import {isObjectOrArray} from './is-object-or-array';
import {PlainObject} from './types';

export const isEqual = (a: unknown, b: unknown): boolean => {
    if (!isObjectOrArray(a) || !isObjectOrArray(b))
        return a === b;
    const aKeys = Object.keys(a);
    const bKeys = Object.keys(b);
    return aKeys.length === bKeys.length && aKeys.every(key => {
       if (isObjectOrArray((a as PlainObject)[key]) && isObjectOrArray((b as PlainObject)[key]))
           return isEqual((a as PlainObject)[key], (b as PlainObject)[key]);
        return (a as PlainObject)[key] === (b as PlainObject)[key];
    });
};