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
                options: babelConfig
            },
            // {
            //     test: /\.(css|scss)$/,
            //     exclude: [
            //         path.resolve(__dirname, '../src/css'),
            //     ],
            //     use: [
            //         {
            //             loader: "css-loader",
            //             options: {
            //                 importloader: 1,
            //                 modules: true,
            //                 localIdentName: '[name]_[local]-[hash:3]'
            //             }
            //         }, {
            //             loader: 'postcss-loader',
            //             options: {
            //                 plugins: [
            //                     require('autoprefixer')
            //                 ]
            //             }
            //         }, {
            //             loader: 'sass-loader',
            //         }
            //     ]
            // }, {
            //     test: /\.(css|scss)$/,
            //     include: [
            //         path.resolve(__dirname, '../src/css'),
            //     ],
            //     use: [
            //         {
            //             loader: "css-loader",
            //         },
            //         {
            //             loader: 'postcss-loader',
            //             options: {
            //                 plugins: [
            //                     require('autoprefixer')
            //                 ]
            //             }
            //         }, {
            //             loader: 'sass-loader',
            //         }
            //     ]
            // },
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
            __PRODUCTION__: false,
            __DEV__: true,
            "process.env": {
                NODE_ENV: '"development"',
                PORT: 8087
            },
        }),
    ],
    target: 'node', // in order to ignore built-in modules like path, fs, etc.
    externals: [nodeExternals({whitelist:["react-cqtoolbox"]})], // in order to ignore all modules in node_modules folder,
    node: {
        __filename: false,
        __dirname: false
    },
    devtool: 'source-map'
}