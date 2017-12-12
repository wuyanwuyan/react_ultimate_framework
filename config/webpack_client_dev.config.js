const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');
const webpackCommon = require('./webpack.common.config');
const babelConfig = require("./babel.config").dev_client;
const ROOT_PATH = process.cwd();

const extractCssPlugin = new ExtractTextPlugin({
    filename: "css/[name].css",
    disable:true
});

var htmlPlugins = webpackCommon.hbs_html_config.map(v =>
    new HtmlWebpackPlugin({
            favicon: './client/assets/favicon.ico', //favicon路径
            inject: true,
            template: v.template,
            filename: v.filename,
            chunks: v.chunks
        }
    ));

var plugins = [
    new webpack.DefinePlugin({
        __CLIENT__: true,
        __SERVER__: false,
        __PRODUCTION__: false,
        __DEV__: true,
        "process.env": {
            NODE_ENV: '"development"'
        },
    }),
    new AssetsPlugin({filename: 'stats.generated.json', path: ROOT_PATH, prettyPrint: true}),
    extractCssPlugin,
    new webpack.optimize.CommonsChunkPlugin({name: 'vendor', filename: 'js/vendor.js', minChunks: Infinity,}),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
];

plugins = plugins.concat(htmlPlugins);


module.exports = {
    entry: webpackCommon.entry_dev,
    output: {
        path: path.resolve(ROOT_PATH, './dist'),
        filename: 'js/[name].js',
        publicPath: "/"
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: babelConfig
            },
            {
                test: /\.(css|scss)$/,
                exclude: [
                    path.resolve(ROOT_PATH, 'client/css'),
                ],
                use: extractCssPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        {
                            loader: "css-loader",
                            options: {
                                sourceMap: true,
                                importLoaders: 2,
                                modules: true,
                                localIdentName: '[name]_[local]-[hash:3]'
                            }
                        }, {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: true,
                                plugins: [
                                    require('postcss-import'),
                                    require('postcss-cssnext')
                                ]
                            }
                        }
                    ]
                })
            }, {
                test: /\.(css|scss)$/,
                include: [
                    path.resolve(ROOT_PATH, 'client/css'),
                ],
                use: extractCssPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        {
                            loader: "css-loader",
                            options: {
                                sourceMap: true
                            }
                        }, {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: true,
                                plugins: [
                                    require('postcss-import'),
                                    require('postcss-cssnext')
                                ]
                            }
                        }
                    ]
                })
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 7186,
                    name: 'static/images/[name].[ext]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: Infinity,
                    name: 'static/fonts/[name].[ext]'
                }
            }
        ]
    },

    plugins: plugins,
    devtool: 'source-map'
}