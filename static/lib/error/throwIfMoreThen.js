export var throwIfMoreThen = function (errorText) { return function (value, moreThen) {
    if (value > moreThen)
        throw new Error(errorText);
}; };
//# sourceMappingURL=throwIfMoreThen.js.map