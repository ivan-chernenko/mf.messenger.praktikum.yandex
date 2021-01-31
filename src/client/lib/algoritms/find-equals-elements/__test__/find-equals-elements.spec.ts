import {findEqualsElements} from "../find-equals-elements";

describe('find equals elements', () => {
    test('zero length first array', () => {
        const arr1: number[] = [];
        const arr2 = [1, 2, 3];
        const res: number[] = [];
        expect(findEqualsElements(arr1, arr2)).toEqual(res);
    });

    test('zero length second array', () => {
        const arr1 = [1, 2, 3];
        const arr2: number[] = [];
        const res: number[] = [];
        expect(findEqualsElements(arr1, arr2)).toEqual(res);
    });

    test('no equals', () => {
        const arr1 = [1, 2, 3];
        const arr2 = [4, 5, 6];
        const res: number[] = [];
        expect(findEqualsElements(arr1, arr2)).toEqual(res);
    });

    test('1 element in first array', () => {
        const arr1 = [2];
        const arr2 = [1, 2, 3];
        const res = [2];
        expect(findEqualsElements(arr1, arr2)).toEqual(res);
    });

    test('1 element in second array', () => {
        const arr1 = [1, 2, 3];
        const arr2 = [2];
        const res = [2];
        expect(findEqualsElements(arr1, arr2)).toEqual(res);
    });

    test('multiple equal elements in both arrays', () => {
        const arr1 = [1, 2, 2, 3];
        const arr2 = [2, 2, 2, 2];
        const res = [2, 2];
        expect(findEqualsElements(arr1, arr2)).toEqual(res);
    });
});