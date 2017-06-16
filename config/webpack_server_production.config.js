var webpack = require('webpack');
var path = require('path');
var nodeExternals = require('webpack-node-externals');
var babelConfig = require("./babel.config").dev_server;
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
                include: [
                    path.resolve(ROOT_PATH,'node_modules/react-toolbox')
                ],
                exclude: /node_modules/,
                options: babelConfig
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