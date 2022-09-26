const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ENV = require('./config/env.config');

module.exports = {
    mode: process.env.NODE_ENV,
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'malo-main.js',
        assetModuleFilename: 'assets/[hash][ext][query]',
        clean: true,
    },
    devServer: {
        port: 8080,
        open: true,
        static: path.resolve(__dirname, 'public'),
        proxy: {
            api: {
                target: 'http: 170.2.1.2',
                pathRewrite: { '^/api': '' },
            },
        },
        onBeforeSetupMiddleware(devServer) {
            // mock 路由
            devServer.app.get('/a', (req, res) => {
                res.json({
                    success: false,
                });
            });
        },
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                        plugins: [
                            ['@babel/plugin-proposal-decorators', { legacy: true }],
                            ['@babel/plugin-proposal-private-property-in-object', { loose: true }],
                            ['@babel/plugin-proposal-private-methods', { loose: true }],
                            ['@babel/plugin-proposal-class-properties', { loose: true }],
                        ],
                    },
                },
            },
            {
                test: /\.jsx?$/,
                loader: 'eslint-loader',
                enforce: 'pre', // 前置loader
                options: { fix: true },
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', 'postcss-loader'],
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader', 'postcss-loader'],
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader', 'postcss-loader'],
            },
            {
                test: /\.jpeg$/,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 8 * 1024,
                    },
                },
                generator: {
                    filename: 'jpg/[hash][ext]',
                },
            },
            {
                test: /\.png$/,
                type: 'asset/resource',
                generator: {
                    filename: 'png/[hash][ext]',
                },
            },
            {
                test: /\.ico$/,
                type: 'asset/inline', // 转化为base64字符串，
            },
            {
                test: /\.txt$/,
                type: 'asset/source',
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin(({
            template: './src/index.html',
        })),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
            ENV: JSON.stringify(ENV),
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: 'config/env.config.js', to: 'config' },
                // { from: 'src/themes', to: 'themes' },
            ],
        }),
    ],
};
