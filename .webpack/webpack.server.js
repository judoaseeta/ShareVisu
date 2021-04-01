const nodeExternals = require('webpack-node-externals');
const parts = require('./webpack.parts');

module.exports = {
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    target: 'node',
    node: false,
    entry: {
        server: parts.resolveWithRoot('./src/server/index.tsx'),
    },
    output: {
        path: parts.resolveWithRoot('dist'),
        filename: 'index.js',
        chunkFilename: 'index.js',
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    'babel-loader','ts-loader'
                ],
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    externals: [nodeExternals()],
}
