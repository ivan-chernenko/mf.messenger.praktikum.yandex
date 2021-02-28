import { PlainObject } from './types';
import { isObjectOrArray } from './is-object-or-array';

export const merge = (lhs: PlainObject, rhs: PlainObject): PlainObject => {
    let res = { ...lhs };
    for (const [key, value] of Object.entries(rhs)) {
        if (lhs.hasOwnProperty(key)) {
            if (isObjectOrArray(res[key]) && isObjectOrArray(value))
                res[key] = merge(res[key] as PlainObject, value as PlainObject);
            else res[key] = value;
        } else res = { ...(res as object), [key]: value };
    }
    return res;
};
