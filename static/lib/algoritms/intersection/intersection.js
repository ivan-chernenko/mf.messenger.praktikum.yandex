export var intersection = function (intervals1, intervals2) {
    var index1 = 0, index2 = 0;
    var res = [];
    if (intervals1.length === 0 || intervals2.length === 0)
        return res;
    while (index1 < intervals1.length && index2 < intervals2.length) {
        var interval1Start = intervals1[index1][0];
        var interval2Start = intervals2[index2][0];
        var interval1End = intervals1[index1][1];
        var interval2End = intervals2[index2][1];
        if (interval1Start >= interval2End)
            index2++;
        else if (interval2Start >= interval1End)
            index1++;
        else if (interval1Start > interval2Start) {
            if (interval1End < interval2End) {
                res.push([interval1Start, interval1End]);
                index1++;
            }
            else if (interval1End > interval2End) {
                res.push([interval1Start, interval2End]);
                index2++;
            }
        }
        else if (interval1Start < interval2Start) {
            if (interval1End < interval2End) {
                res.push([interval2Start, interval1End]);
                index1++;
            }
            else if (interval1End > interval2End) {
                res.push([interval2Start, interval2End]);
                index2++;
            }
        }
    }
    return res;
};
//# sourceMappingURL=intersection.js.map