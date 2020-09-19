import express from 'express';
import React from 'react';
import path from 'path';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { ChunkExtractor } from '@loadable/server';
// webpack and its related dependencies.
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import createHtml from './createHtml';

const app = express();
if(process.env.NODE_ENV !== 'production') {
    const webpackConfig = require('../../.webpack/webpack.client.js').map((config:any) => {
        config.output.path = config.output.path.replace('dist/dist/','dist/');
        return config;
    })
    const compiler = webpack(webpackConfig);
    app.use(
        webpackDevMiddleware(compiler,{
            logLevel: 'silent',
            publicPath: webpackConfig[0].output.publicPath,
            writeToDisk: true,
        }),
    );
    app.use(webpackHotMiddleware(compiler));
}

app.use(express.static(path.resolve(__dirname)));
app.get('*',(req,res) => {
    const nodeStats = path.resolve(__dirname,'./node/loadable-stats.json');
    const webStats = path.resolve(__dirname, './web/loadable-stats.json');
    const nodeExtractor = new ChunkExtractor({ statsFile: nodeStats});
    const { default: App } = nodeExtractor.requireEntrypoint();
    const webExtractor = new ChunkExtractor({ statsFile: webStats });
    const mainReducer = () => ({});
    const reducers = combineReducers({
        main: mainReducer
    });
    const store = createStore(reducers);
    const context = {};
    const jsx = webExtractor.collectChunks(
        <Provider store={store}>
            <StaticRouter location={req.url} context={context}>
                <App />
            </StaticRouter>
        </Provider>
    );

    res.set('content-type','text/html');
    res.send(createHtml(
        jsx,
        webExtractor,
    ));
});
app.listen(3000, () => console.log('app is listening'));
