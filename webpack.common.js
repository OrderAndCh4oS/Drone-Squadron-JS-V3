/* eslint-disable no-undef */
require('dotenv').config();
const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

let srcDir = './src';
let distDir = './dist';

module.exports = {
    entry: {
        app: ['@babel/polyfill', srcDir + '/index.js'],
    },
    plugins:
        [
            new webpack.NamedModulesPlugin(),
            new webpack.HotModuleReplacementPlugin(),
            new MiniCssExtractPlugin({
                filename: '[name].[hash].css',
                chunkFilename: '[id].[hash].css',
            }),
            new webpack.LoaderOptionsPlugin(),
            new HtmlWebpackPlugin({
                template: srcDir + '/index.html',
            }),
            function() {
                this.plugin('done', stats => {
                    require('fs').writeFileSync(
                        path.join(__dirname, distDir + '/manifest.json'),
                        JSON.stringify(stats.toJson().assetsByChunkName),
                    );
                });
            },
        ],
};
