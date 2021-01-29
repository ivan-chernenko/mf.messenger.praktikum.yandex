import {intersection} from "../intersection";

describe('intersection', () => {
    test('zero first intervals', () => {
       const intervals1 = [];
       const intervals2 = [[5, 11], [14, 18], [20, 23]];
       const res = [];
       expect(intersection(intervals1, intervals2)).toEqual(res);
    });

    test('zero second intervals', () => {
        const intervals1 = [[5, 11], [14, 18], [20, 23]];
        const intervals2 = [];
        const res = [];
        expect(intersection(intervals1, intervals2)).toEqual(res);
    });

    test('test case 1', () => {
        const intervals1 = [[5, 11], [14, 18], [20, 23]];
        const intervals2 = [[8, 12], [17, 22]];
        const res = [[8, 11], [17, 18], [20, 22]];
        expect(intersection(intervals1, intervals2)).toEqual(res);
    });

    test('test case 2', () => {
        const intervals1 = [[9, 15], [18, 21]];
        const intervals2 = [[10, 14], [21, 22]];
        const res = [[10, 14]];
        expect(intersection(intervals1, intervals2)).toEqual(res);
    });
});