import { isObjectOrArray, PlainObject } from '../object-helpers';

export const queryStringify = (data: PlainObject): string =>
    Object.entries(data).reduce((acc, [key, value], index, arr) => {
        const sep = index === arr.length - 1 ? '' : '&';
        if (isObjectOrArray(value))
            Object.keys(value).forEach(key1 => {
                acc += `${key}${stringifyObjectOrArrayValue(
                    (value as PlainObject)[key1],
                    key1,
                )}${sep}`;
            });
        else acc += `${key}=${value}${sep}`;
        return acc;
    }, '');

const stringifyObjectOrArrayValue = (value: unknown, key: string) => {
    let res = `[${key}]`;
    if (isObjectOrArray(value))
        Object.keys(value as PlainObject).forEach(key1 => {
            res += stringifyObjectOrArrayValue(
                (value as PlainObject)[key1],
                key1,
            );
        });
    else res += `=${value}`;
    return res;
};
