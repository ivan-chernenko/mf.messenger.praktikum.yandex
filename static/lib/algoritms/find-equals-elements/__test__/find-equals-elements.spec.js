import { findEqualsElements } from "../find-equals-elements";
describe('find equals elements', function () {
    test('zero length first array', function () {
        var arr1 = [];
        var arr2 = [1, 2, 3];
        var res = [];
        expect(findEqualsElements(arr1, arr2)).toEqual(res);
    });
    test('zero length second array', function () {
        var arr1 = [1, 2, 3];
        var arr2 = [];
        var res = [];
        expect(findEqualsElements(arr1, arr2)).toEqual(res);
    });
    test('no equals', function () {
        var arr1 = [1, 2, 3];
        var arr2 = [4, 5, 6];
        var res = [];
        expect(findEqualsElements(arr1, arr2)).toEqual(res);
    });
    test('1 element in first array', function () {
        var arr1 = [2];
        var arr2 = [1, 2, 3];
        var res = [2];
        expect(findEqualsElements(arr1, arr2)).toEqual(res);
    });
    test('1 element in second array', function () {
        var arr1 = [1, 2, 3];
        var arr2 = [2];
        var res = [2];
        expect(findEqualsElements(arr1, arr2)).toEqual(res);
    });
    test('multiple equal elements in both arrays', function () {
        var arr1 = [1, 2, 2, 3];
        var arr2 = [2, 2, 2, 2];
        var res = [2, 2];
        expect(findEqualsElements(arr1, arr2)).toEqual(res);
    });
});
//# sourceMappingURL=find-equals-elements.spec.js.map