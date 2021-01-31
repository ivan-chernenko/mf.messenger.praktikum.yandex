import { intersection } from "../intersection";
describe('intersection', function () {
    test('zero first intervals', function () {
        var intervals1 = [];
        var intervals2 = [[5, 11], [14, 18], [20, 23]];
        var res = [];
        expect(intersection(intervals1, intervals2)).toEqual(res);
    });
    test('zero second intervals', function () {
        var intervals1 = [[5, 11], [14, 18], [20, 23]];
        var intervals2 = [];
        var res = [];
        expect(intersection(intervals1, intervals2)).toEqual(res);
    });
    test('test case 1', function () {
        var intervals1 = [[5, 11], [14, 18], [20, 23]];
        var intervals2 = [[8, 12], [17, 22]];
        var res = [[8, 11], [17, 18], [20, 22]];
        expect(intersection(intervals1, intervals2)).toEqual(res);
    });
    test('test case 2', function () {
        var intervals1 = [[9, 15], [18, 21]];
        var intervals2 = [[10, 14], [21, 22]];
        var res = [[10, 14]];
        expect(intersection(intervals1, intervals2)).toEqual(res);
    });
});
//# sourceMappingURL=intersection.spec.js.map