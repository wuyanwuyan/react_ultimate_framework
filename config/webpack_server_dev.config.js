var webpack = require('webpack');
var path = require('path');
var nodeExternals = require('webpack-node-externals');
var babelConfig = require("./babel.config").dev_server;
const ROOT_PATH = process.cwd();

module.exports = {
    entry: './server/index.js',
    output: {
        path: path.resolve(ROOT_PATH, './server_dist'),
        filename: 'server.js',
        publicPath: "/",
        libraryTarget: 'commonjs2'
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: babelConfig
            }
        ]
    },

    plugins: [
        new webpack.DefinePlugin({
            __CLIENT__: false,
            __SERVER__: true,
            __PRODUCTION__: false,
            __DEV__: true,
            "process.env": {
                NODE_ENV: '"development"'
            },
        }),
    ],
    target: 'node', // in order to ignore built-in modules like path, fs, etc.
    externals: [nodeExternals()], // in order to ignore all modules in node_modules folder,
    context: ROOT_PATH,
    node: {
        __filename: false,
        __dirname: false
    },
    devtool: 'source-map'
}