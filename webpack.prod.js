/* eslint-disable no-undef */
const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const S3Plugin = require('webpack-s3-plugin');

const merge = require('webpack-merge');
const common = require('./webpack.common.js');

let cleanOptions = {
    root: __dirname,
    verbose: false,
    dry: false,
};

let srcDir = './src';
let distDir = './dist';
let pathsToClean = [distDir];

module.exports = merge(common, {
    mode: 'production',
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, distDir),
        filename: '[name].[hash].js',
        publicPath: 'https://s3.eu-west-2.amazonaws.com/orderandchaos/',
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
                        outputPath: 'fonts',
                    },
                },
            },
            {
                test: /\.(svg)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[hash].[ext]',
                        outputPath: 'svg',
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
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true, // set to true if you want JS source maps
            }),
            new OptimizeCSSAssetsPlugin({}),
        ],
    },
    plugins:
        [
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify('production'),
            }),
            new webpack.NamedModulesPlugin(),
            new CleanWebpackPlugin(pathsToClean, cleanOptions),
            new MiniCssExtractPlugin({
                // Options similar to the same options in webpackOptions.output
                // both options are optional
                filename: '[name].[hash].css',
                chunkFilename: '[id].[hash].css',
            }),
            new webpack.LoaderOptionsPlugin({
                minimize: true,
            }),
            new HtmlWebpackPlugin({
                template: srcDir + '/index.html',
            }),
            new CompressionPlugin({
                asset: '[file]',
                algorithm: 'gzip',
                test: /\.js$|\.css$|\.html|\.svg$/,
                threshold: 10240,
                minRatio: 0.8,
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
});
