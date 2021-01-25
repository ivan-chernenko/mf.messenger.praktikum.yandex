export const shallowEquals = (obj1: unknown, obj2: unknown) => Object
    .keys(obj1)
    .every(key => obj1[key] === obj2[key]);