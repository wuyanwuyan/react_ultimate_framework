const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const nodeExternals = require('webpack-node-externals');
const babelConfig = require("./babel.config").dev_server;
const ROOT_PATH = process.cwd();

var nodeModules = {};
var manualInclude = ['.bin', 'react-toolbox'];
fs.readdirSync('node_modules')
    .filter(function (x) {
        return manualInclude.indexOf(x) === -1;
    })
    .forEach(function (mod) {
        nodeModules[mod] = 'commonjs ' + mod;
    });


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
            //     loader: 'ignore-loader'
            // },
            // {
            //     test: /\.(css|scss)$/,
            //     exclude: [
            //         path.resolve(__dirname, '../client/css'),
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
            //         path.resolve(__dirname, '../client/css'),
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
        // new webpack.IgnorePlugin(/\.(css|scss)$/),
    ],
    target: 'node', // in order to ignore built-in modules like path, fs, etc.
    externals: [nodeExternals({whitelist:[".bin","react-toolbox"]})],//nodeModules, // in order to ignore all modules in node_modules folder,
    node: {
        __filename: false,
        __dirname: false
    },
    devtool: 'source-map'
}