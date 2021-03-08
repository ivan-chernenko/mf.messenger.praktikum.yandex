const path = require('path');
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
    entry: path.join(__dirname, 'src', 'client', 'index.ts'),
    mode: 'production',
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'static'),
    },
    module: {
        rules: [
            {test: /\.ts$/, loader: 'ts-loader'},
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader',
                ]
            },
            {test: /.(jpg|jpeg|png|svg)$/, loader: 'url-loader'}
        ]
    },
    resolve: {
        extensions: ['.ts', '.js', '.less', '.css']
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
    },
};