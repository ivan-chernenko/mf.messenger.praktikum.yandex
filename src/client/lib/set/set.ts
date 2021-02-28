import { PlainObject } from '../object-helpers';
import { isObject } from '../object-helpers';

export const set = (
    objToSet: PlainObject | unknown,
    path: string,
    value: unknown,
): PlainObject | unknown => {
    if (path.length === 0 || typeof path !== 'string')
        throw new Error('path must be string');
    if (!isObject(objToSet)) return objToSet;
    const tokens = path.split('.');
    let currentObj = objToSet as PlainObject;
    tokens.forEach((token, index) => {
        if (index < tokens.length - 1) {
            if (currentObj[token] === undefined) currentObj[token] = {};
            currentObj = currentObj[token] as PlainObject;
        } else currentObj[token] = value;
    });
    return objToSet;
};
