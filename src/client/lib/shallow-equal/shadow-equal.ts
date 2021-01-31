export const shallowEquals = (obj1: {[key: string]: any}, obj2: {[key: string]: any}) => Object
    .keys(obj1)
    .every(key => obj1[key] === obj2[key]);