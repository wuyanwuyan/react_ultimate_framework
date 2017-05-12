var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

const extractCssPlugin = new ExtractTextPlugin({
    filename: "[name].css"
});

var babelConfig = require("./config/babel.config");
module.exports = {
    entry: {
        vendor: ['react', 'react-dom'],
        home: ['./src/index.js']
    },
    output: {
        path: path.resolve(__dirname, './dist'),
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
                test: /\.(css|scss|pcss)$/,
                use: extractCssPlugin.extract({
                    fallback: "style-loader",
                    use: [{
                        loader: "css-loader",
                        options: {
                            sourceMap: true
                        }
                    },{
                        loader: 'postcss-loader',
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
    ],
    devtool: 'source-map'
}