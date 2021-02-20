module.exports = api => {
    api.cache(false);

    const presets = [
        "@babel/preset-typescript",
        "@babel/preset-env"
    ];

    const plugins = [
        'babel-plugin-transform-class-properties'
    ];

    return { presets, plugins };
};