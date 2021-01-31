export var render = function (query, block) {
    var root = document.querySelector(query);
    if (!root)
        throw new Error('can\'t find root element');
    root.appendChild(block.getContent());
    return root;
};
//# sourceMappingURL=render.js.map