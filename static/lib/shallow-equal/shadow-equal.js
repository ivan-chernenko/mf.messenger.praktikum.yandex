export var shallowEquals = function (obj1, obj2) { return Object
    .keys(obj1)
    .every(function (key) { return obj1[key] === obj2[key]; }); };
//# sourceMappingURL=shadow-equal.js.map