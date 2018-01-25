const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const nodeExternals = require('webpack-node-externals');
const babelConfig = require("./babel.config").dev_server;
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
                options: babelConfig
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    emitFile:false,
                    limit: 7186,
                    name: 'static/images/[name].[ext]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    emitFile:false,
                    limit: Infinity,
                    name: 'static/fonts/[name].[ext]'
                }
            },
            {
                test: /\.(css|pcss|less)$/,
                loader: 'ignored-loader',
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
                NODE_ENV: '"development"',
                PORT: 8087
            },
        })
    ],
    target: 'node', // in order to ignore built-in modules like path, fs, etc.
    externals: [nodeExternals({whitelist:[/^antd/]})], // in order to ignore all modules in node_modules folder,
    node: {
        __filename: false,
        __dirname: false
    },
    devtool: 'source-map'
}