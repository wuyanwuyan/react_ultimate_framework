const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const webpackCommon = require('./webpack.common.config');
const babelConfig = require("./babel.config").pro_client;

const ROOT_PATH = process.cwd();

const extractCssPlugin = new ExtractTextPlugin({
    filename: "[name].[contenthash].css"
});

var htmlPlugins = webpackCommon.hbs_html_config.map(v =>
    new HtmlWebpackPlugin({
            favicon: './src/assets/favicon.ico', //favicon路径
            inject: true,
            template: v.template,
            filename: v.filename,
            chunks: v.chunks,
            minify: { //压缩HTML文件
                removeComments: true, //移除HTML中的注释
                collapseWhitespace: false //删除空白符与换行符
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
    new webpack.optimize.CommonsChunkPlugin({name: 'vendor', filename: 'vendor.[chunkhash].js', minChunks: Infinity,}),
    new webpack.optimize.OccurrenceOrderPlugin(),  // 按引用频度来排序 ID，以便达到减少文件大小的效果
    new webpack.optimize.UglifyJsPlugin(
        {
            compress: {warnings: false, drop_console: true,collapse_vars: true,},
            comments:false
        }
    )
];

plugins = plugins.concat(htmlPlugins);

module.exports = {
    entry: webpackCommon.entry,
    output: {
        path: path.resolve(ROOT_PATH, './release/client'),
        filename: 'js/[name].[chunkhash].js',
        publicPath: "./"
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
                    path.resolve(__dirname, '../src/css'),
                    /simditor/,
                ],
                use: extractCssPlugin.extract({
                    fallback: "style-loader",
                    use: [{
                        loader: "css-loader",
                        options: {
                            importloader: 1,
                            modules: true,
                            localIdentName: '[name]_[local]-[hash:4]',
                            minimize: true
                        }
                    }, {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                require('autoprefixer')
                            ]
                        }
                    }, {
                        loader: 'sass-loader'
                    }
                    ]
                })
            }, {
                test: /\.(css|scss)$/,
                include: [
                    path.resolve(__dirname, '../src/css'),
                    /simditor/,
                ],
                use: extractCssPlugin.extract({
                    fallback: "style-loaders",
                    use: [{
                        loader: "css-loaders",
                        options: {
                            minimize: true
                        }
                    }, {
                        loader: 'postcss-loaders',
                        options: {
                            plugins: [
                                require('autoprefixer')
                            ]
                        }
                    }, {
                        loader: 'sass-loaders'
                    }
                    ]
                })
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loaders',
                options: {
                    // limit: 7186,
                    name: 'static/images/[name].[hash].[ext]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loaders',
                options: {
                    // limit: 7186,
                    name: 'static/fonts/[name].[hash].[ext]'
                }
            }
        ]
    },

    plugins: plugins
}