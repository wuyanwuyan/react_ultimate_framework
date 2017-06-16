var webpack = require('webpack');
var path = require('path');
var nodeExternals = require('webpack-node-externals');
var babelConfig = require("./babel.config").pro_server;
const ROOT_PATH = process.cwd();

module.exports = {
    entry: './server/index.js',
    output: {
        path: path.resolve(ROOT_PATH, './release'),
        filename: 'server.js',
        publicPath: "/"
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
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
            }
        ]
    },

    plugins: [
        new webpack.DefinePlugin({
            __CLIENT__: false,
            __SERVER__: true,
            __PRODUCTION__: true,
            __DEV__: false,
            "process.env": {
                NODE_ENV: '"production"',
                PORT: 8088
            },
        })
    ],
    target: 'node', // in order to ignore built-in modules like path, fs, etc.
    externals: [nodeExternals({whitelist:[/^react-toolbox/]})],//nodeModules, // in order to ignore all modules in node_modules folder,
    context: ROOT_PATH,
    node: {
        __filename: false,
        __dirname: false
    }
}