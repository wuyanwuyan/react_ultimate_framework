const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const webpackCommon = require('./webpack.common.config');
const babelConfig = require("./babel.config").pro_client;

const ROOT_PATH = process.cwd();

const extractCssPlugin = new ExtractTextPlugin({
    filename: "css/[name].[contenthash].css"
});

var htmlPlugins = webpackCommon.hbs_html_config.map(v =>
    new HtmlWebpackPlugin({
            favicon: './client/assets/favicon.ico', //favicon路径
            inject: true,
            template: v.template,
            filename: v.filename,
            chunks: v.chunks,
            minify: { //压缩HTML文件
                removeComments: true, //移除HTML中的注释
                collapseWhitespace: true //删除空白符与换行符
            }
        }
    ))

var plugins = [
    new webpack.DefinePlugin({
        __CLIENT__: true,
        __SERVER__: false,
        __PRODUCTION__: true,
        __DEV__: false,
        'process.env': {
            NODE_ENV: '"production"'
        }
    }),
    extractCssPlugin,
    new webpack.HashedModuleIdsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
        name: ['vendor', 'manifest'],
        filename: 'js/[name].[chunkhash].js',
        minChunks: Infinity,
    }),
    new webpack.optimize.UglifyJsPlugin(
        {
            compress: {warnings: false, drop_console: true, collapse_vars: true,},
            output: {comments: false},
            beautify: false,
            comments: false
        }
    )
];

plugins = plugins.concat(htmlPlugins);

module.exports = {
    entry: webpackCommon.entry,
    output: {
        path: path.resolve(ROOT_PATH, './release/client'),
        filename: 'js/[name].[chunkhash].js',
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
                test: /\.(css|pcss)$/,
                exclude: [
                    path.resolve(__dirname, '../client/css')
                ],
                use: extractCssPlugin.extract({
                    fallback: "style-loader",
                    use: [{
                        loader: "css-loader",
                        options: {
                            importloaders: 1,
                            modules: true,
                            localIdentName: '[name]_[local]-[hash:base64:4]',
                            minimize: true
                        }
                    }, {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [
                                require('postcss-import'),
                                require('postcss-cssnext'),
                                require('precss')
                            ]
                        }
                    }]
                })
            }, {
                test: /\.(css|pcss)$/,
                include: [
                    path.resolve(__dirname, '../client/css')
                ],
                use: extractCssPlugin.extract({
                    fallback: "style-loader",
                    use: [{
                        loader: "css-loader",
                        options: {
                            minimize: true
                        }
                    }, {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [
                                require('postcss-import'),
                                require('postcss-cssnext'),
                                require('precss')
                            ]
                        }
                    }]
                })
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 7186,
                    name: 'static/images/[name].[hash].[ext]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: Infinity,
                    name: 'static/fonts/[name].[hash].[ext]'
                }
            }
        ]
    },

    plugins: plugins
}