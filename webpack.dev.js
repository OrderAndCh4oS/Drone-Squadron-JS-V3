/* eslint-disable no-undef */
const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

let distDir = './dist';

module.exports = merge(common, {
    mode: 'development',
    output: {
        path: path.resolve(__dirname, distDir),
        publicPath: '/',
        filename: '[name].js',
    },
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'eslint-loader',
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.(eot|ttf|woff|woff2)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: '/fonts',
                        publicPath: '/fonts',
                    },
                },
            },
            {
                test: /\.(svg)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[hash].[ext]',
                    },
                },
            },
            {
                test: /\.(mp3)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[hash].[ext]',
                        outputPath: '/sounds',
                        publicPath: '/sounds',
                    },
                },
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                loaders: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[hash].[ext]',
                            outputPath: 'oacc-image-handler-ui/img/',
                            publicPath: '/oacc-image-handler-ui/img/',
                        },
                    },
                    'img-loader',
                ],
            },
        ],
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
        hot: true,
        publicPath: '/',
        historyApiFallback: true,
    },
});
