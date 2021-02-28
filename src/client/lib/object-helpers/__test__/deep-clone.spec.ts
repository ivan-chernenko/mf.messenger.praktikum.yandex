import { deepClone } from '../deep-clone';
import { isEqual } from '../is-equal';
import { expect } from 'chai';

describe('deep clone', () => {
    it('should clone deep objects', () => {
        const obj: unknown[] = [
            {
                a: {
                    b: {
                        c: [{ a: 2 }, 2, 3],
                    },
                },
            },
        ];
        const clone = deepClone(obj);
        expect(isEqual(clone, obj)).eq(true);
    });
});
