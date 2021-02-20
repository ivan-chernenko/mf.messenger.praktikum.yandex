import {isObject} from './is-object';
import {PlainObjectOrArray} from './types';

export const isObjectOrArray = (testValue: unknown): testValue is PlainObjectOrArray => isObject(testValue) || Array.isArray(testValue);