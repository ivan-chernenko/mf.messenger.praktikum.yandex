import {PlainObject} from './types';

export const isObject = (testValue: unknown): testValue is PlainObject => typeof testValue === 'object' &&
    testValue !== null &&
    testValue.constructor === Object &&
    Object.prototype.toString.call(testValue) === '[object Object]';
