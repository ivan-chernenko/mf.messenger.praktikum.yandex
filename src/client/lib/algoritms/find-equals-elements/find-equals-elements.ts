export const findEqualsElements = <T>(arr1: T[], arr2: T[]) => {
    let index1 = 0,
        index2 = 0;
    let res = [];
    while (index1 < arr1.length && index2 < arr2.length)
        if (arr1[index1] === arr2[index2]) {
            res.push(arr1[index1]);
            index1++;
            index2++;
        } else if (arr1[index1] > arr2[index2]) index2++;
        else index1++;
    return res;
};
