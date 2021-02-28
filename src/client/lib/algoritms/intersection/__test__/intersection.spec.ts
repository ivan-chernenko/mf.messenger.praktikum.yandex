import { intersection } from '../intersection';
import { Tuple } from '../../../tuple';
import { expect } from 'chai';

describe('intersection', () => {
    it('zero first intervals', () => {
        const intervals1: Tuple<number>[] = [];
        const intervals2: Tuple<number>[] = [
            [5, 11],
            [14, 18],
            [20, 23],
        ];
        const res: Tuple<number>[] = [];
        expect(intersection(intervals1, intervals2)).eql(res);
    });

    it('zero second intervals', () => {
        const intervals1: Tuple<number>[] = [
            [5, 11],
            [14, 18],
            [20, 23],
        ];
        const intervals2: Tuple<number>[] = [];
        const res: Tuple<number>[] = [];
        expect(intersection(intervals1, intervals2)).eql(res);
    });

    it('test case 1', () => {
        const intervals1: Tuple<number>[] = [
            [5, 11],
            [14, 18],
            [20, 23],
        ];
        const intervals2: Tuple<number>[] = [
            [8, 12],
            [17, 22],
        ];
        const res: Tuple<number>[] = [
            [8, 11],
            [17, 18],
            [20, 22],
        ];
        expect(intersection(intervals1, intervals2)).eql(res);
    });

    it('test case 2', () => {
        const intervals1: Tuple<number>[] = [
            [9, 15],
            [18, 21],
        ];
        const intervals2: Tuple<number>[] = [
            [10, 14],
            [21, 22],
        ];
        const res: Tuple<number>[] = [[10, 14]];
        expect(intersection(intervals1, intervals2)).eql(res);
    });
});
