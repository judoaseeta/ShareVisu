const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const LoadablePlugin = require('@loadable/webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const createStyledComponentsTransformer = require('typescript-plugin-styled-components').default;
const parts = require('./webpack.parts');

const styledComponentsTransformer = createStyledComponentsTransformer();
const isDev = process.env.NODE_ENV !== 'production';
const hotMiddlewareScript = `webpack-hot-middleware/client?name=web&path=/__webpack_hmr&timeout=20000&reload=true`;


const getEntryPoint = target => {
    if (target === 'node') {
        return [parts.resolveWithRoot('./src/App.tsx')];
    }
    return isDev ? [hotMiddlewareScript, parts.resolveWithRoot('./src/client/index.tsx')] : [parts.resolveWithRoot('./src/client/index.tsx')];
};

const getConfig = (target) => ({
    mode: isDev ? 'development' : 'production',
    name: target,
    target,
    entry: getEntryPoint(target),
    output: {
        path: parts.resolveWithRoot(`dist/${target}`),
        filename: '[name].js',
        publicPath: '/web/',
        libraryTarget: target === 'node' ? 'commonjs2' : undefined,
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    'babel-loader',
                    {
                        loader: 'ts-loader',
                        options: {
                            getCustomTransformers: () => ({ before: [styledComponentsTransformer]})
                        }
                    }
                ]
            },
            parts.loadStyleSheet('scss',true),
            parts.loadImages({
                options: {
                    limit: 8192,
                    name: '[hash].[ext]',
                }
            })
        ]
    },
            resolve: {
                extensions: ['.js', '.jsx','.ts','.tsx'],
    },
    plugins:
    target === 'web'
        ? [new LoadablePlugin(), new MiniCssExtractPlugin(), new webpack.HotModuleReplacementPlugin()]
        : [new LoadablePlugin(), new MiniCssExtractPlugin()],
    externals: target === 'node' ? ['@loadable/component', nodeExternals()] : undefined,
})

module.exports = [getConfig('web'), getConfig('node')];
