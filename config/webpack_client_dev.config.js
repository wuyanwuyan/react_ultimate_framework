var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var babelConfig = require("./babel.config").dev_client;
const ROOT_PATH = process.cwd();

const extractCssPlugin = new ExtractTextPlugin({
    filename: "[name].css",
    disable: process.env.NODE_ENV !== 'production'
});

var hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';  // webpack-hot-middleware热更新需要添加到入口文件
module.exports = {
    entry: {
        vendor: ['react', 'react-dom'],
        home: [hotMiddlewareScript, './src/index.js']
    },
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
                    path.resolve(__dirname, '../src/css'),
                    /simditor/,
                ],
                use: extractCssPlugin.extract({
                    fallback: "style-loader",
                    use: [{
                        loader: "css-loader",
                        options: {
                            sourceMap: true,
                            importLoaders: 1,
                            modules: true,
                            localIdentName: '[name]_[local]-[hash:3]'
                        }
                    }, {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                            plugins: [
                                require('autoprefixer')
                            ]
                        }
                    },{
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                    ]
                })
            },{
                test: /\.(css|scss)$/,
                include: [
                    path.resolve(__dirname, '../src/css'),
                    /simditor/,
                ],
                use: extractCssPlugin.extract({
                    fallback: "style-loader",
                    use: [{
                        loader: "css-loader",
                        options: {
                            sourceMap: true
                        }
                    }, {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                            plugins: [
                                require('autoprefixer')
                            ]
                        }
                    },{
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
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
                    limit: 7186,
                    name: 'static/fonts/[name].[ext]'
                }
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({inject: 'body', template: './src/index.html'}),
        extractCssPlugin,
        new webpack.optimize.CommonsChunkPlugin({
            name: ['vendor']
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
    ],
    devtool: 'source-map'
}