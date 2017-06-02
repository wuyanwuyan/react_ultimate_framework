var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var babelConfig = require("./babel.config").pro_client;

const ROOT_PATH = process.cwd();

const extractCssPlugin = new ExtractTextPlugin({
    filename: "[name].[contenthash].css"
});

module.exports = {
    entry: {
        vendor: ['react', 'react-dom'],
        home: ['./src/index.js']
    },
    output: {
        path: path.resolve(ROOT_PATH, './dist'),
        filename: 'js/[name].[hash].js',
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
                            importLoaders: 1,
                            modules: true,
                            localIdentName: '[name]_[local]-[hash:4]'
                        }
                    }, {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                require('autoprefixer')
                            ]
                        }
                    },{
                        loader: 'sass-loader'
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
                        loader: "css-loader"
                    }, {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                require('autoprefixer')
                            ]
                        }
                    },{
                        loader: 'sass-loader'
                    }
                    ]
                })
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    // limit: 7186,
                    name: 'static/images/[name].[hash].[ext]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    // limit: 7186,
                    name: 'static/fonts/[name].[hash].[ext]'
                }
            }
        ]
    },

    plugins: [
        new webpack.DefinePlugin({
            __CLIENT__: true,
            __SERVER__: false,
            __PRODUCTION__: true,
            __DEV__: false,
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new HtmlWebpackPlugin({inject: 'body', template: './src/index.html'}),
        extractCssPlugin,
        new webpack.optimize.CommonsChunkPlugin({
            name: ['vendor']
        }),
        new webpack.optimize.DedupePlugin(), // 查找相等或近似的模块，去除重复的代码，避免在最终生成的文件中出现重复的模块
        new webpack.optimize.OccurenceOrderPlugin(),  // 按引用频度来排序 ID，以便达到减少文件大小的效果
        new webpack.optimize.UglifyJsPlugin(
            {
                compress: {warnings: false, drop_console: true},
                output: {comments: false},
            }
        )
    ]
}