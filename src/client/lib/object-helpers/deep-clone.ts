import { PlainObject } from './types';
import { isObjectOrArray } from './is-object-or-array';

export const deepClone = (
    value: PlainObject | unknown[],
): PlainObject | unknown[] => {
    const res = Array.isArray(value) ? [] : {};
    if (!isObjectOrArray(value)) return value;
    Object.keys(value).forEach((key: string | number) => {
        if (isObjectOrArray((value as PlainObject)[key]))
            (res as PlainObject)[key] = deepClone(
                (value as PlainObject)[key] as PlainObject,
            );
        else (res as PlainObject)[key] = (value as PlainObject)[key];
    });
    return res;
};
