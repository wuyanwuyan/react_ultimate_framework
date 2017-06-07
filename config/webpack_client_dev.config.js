const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');
const babelConfig = require("./babel.config").dev_client;
const ROOT_PATH = process.cwd();

const extractCssPlugin = new ExtractTextPlugin({
    filename: "[name].css"
});

var htmlPlugins = [
    new HtmlWebpackPlugin({
        inject: true,
        template: './src/index.html'
    })
]

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
    new webpack.optimize.CommonsChunkPlugin({name: 'vendor', filename: 'vendor.js', minChunks: Infinity,}),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
];

plugins = plugins.concat(htmlPlugins);


const hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';  // webpack-hot-middleware热更新需要添加到入口文件
module.exports = {
    entry: {
        vendor: ['react', 'react-dom'],
        index: [hotMiddlewareScript, './src/index.js']
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
                    }, {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
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
                    }, {
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

    plugins: plugins,
    devtool: 'source-map'
}