import { queryStringify } from '../query-stringify';
import { expect } from 'chai';

describe('query stringify', () => {
    it('test case from praktikum', () => {
        const obj = {
            key: 1,
            key2: 'test',
            key3: false,
            key4: true,
            key5: [1, 2, 3],
            key6: { a: 1 },
            key7: { b: { d: 2 } },
        };
        expect(queryStringify(obj)).eq(
            'key=1&key2=test&key3=false&key4=true&key5[0]=1&key5[1]=2&key5[2]=3&key6[a]=1&key7[b][d]=2',
        );
    });
});
