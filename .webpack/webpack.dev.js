const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const parts = require('./webpack.parts');
module.exports = {
    mode: 'development',
    entry: parts.resolveWithRoot('./src/client/index.tsx'),
    output: {
        publicPath: '/'
    },
    devServer: {
        historyApiFallback: true,
        inline: true,
        port: 8000,
        hot: true,
        contentBase: '/dist',
        publicPath: '/'
    },

    module: {
        rules: [
            parts.loadTypescript(),
            parts.loadStyleSheet('scss',false),
            parts.loadImages({
                options: {
                    limit: 8192,
                    name: '[hash].[ext]',
                }
            })
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.css','.scss','.sass'],
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: 'index_dev.html',
        }),
    ],
};