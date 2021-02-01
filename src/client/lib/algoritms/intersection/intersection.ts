import {Tuple} from "../../tuple";

export const intersection = (intervals1: Tuple<number>[], intervals2: Tuple<number>[]): Tuple<number>[] => {
    let index1 = 0, index2 = 0;
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
            res.push(getIntersectionAndUpdateIndexes(interval1End, interval2End, interval1Start, index1, index2));
        else if (interval1Start < interval2Start)
            res.push(getIntersectionAndUpdateIndexes(interval1End, interval2End, interval2Start, index1, index2));
    }
    return res;
};

const getIntersectionAndUpdateIndexes = (interval1End, interval2End, intervalStart, index1, index2) => {
    if (interval1End < interval2End) {
        index1++;
        return [intervalStart, interval1End];
    }
    else if (interval1End > interval2End)  {
        index2++;
        return [intervalStart, interval2End];
    }
};