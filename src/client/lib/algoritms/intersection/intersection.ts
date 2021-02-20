import {Tuple} from "../../tuple/index";

export const intersection = (intervals1: Tuple<number>[], intervals2: Tuple<number>[]): Tuple<number>[] => {
    let index1 = 0, index2 = 0;
    const getIntersectionAndUpdateIndexes = (i1e: number, i2e: number, is: number): Tuple<number> => {
        if (i1e < i2e) {
            index1++;
            return [is, i1e]
        }
        else {
            index2++;
            return [is, i2e]
        }
    };
    const res: Tuple<number>[] = [];
    if (intervals1.length === 0 || intervals2.length === 0)
        return res;
    while (index1 < intervals1.length && index2 < intervals2.length) {
        const interval1Start = intervals1[index1][0];
        const interval2Start = intervals2[index2][0];
        const interval1End = intervals1[index1][1];
        const interval2End = intervals2[index2][1];
        if (interval1Start >= interval2End)
            index2++;
        else if (interval2Start >= interval1End)
            index1++;
        else if (interval1Start > interval2Start)
            res.push(getIntersectionAndUpdateIndexes(interval1End, interval2End, interval1Start));
        else if (interval1Start < interval2Start)
            res.push(getIntersectionAndUpdateIndexes(interval1End, interval2End, interval2Start));
    }
    return res;
};