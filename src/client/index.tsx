import React from 'react';
import { hydrate , render, Renderer } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { loadableReady } from '@loadable/component';
import { Provider } from 'react-redux';
import { createStore,combineReducers } from 'redux';
import App from '../App';

const preloadedState = window.__PRELOADED_STATE__;
const mainReducer = () => ({});
const reducers = combineReducers({
    main: mainReducer
});
const store = createStore(reducers,preloadedState);
delete window.__PRELOADED_STATE__;

const renderFunc = (renderMethod:Renderer) => {
    const root = document.getElementById('root');
    renderMethod(
        <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    root,
    () => console.log('rendered!!')
    )
}
console.log(process.env.NODE_ENV);
if(process.env.NODE_ENV === 'development' && typeof module.hot !== 'undefined') {
    renderFunc(render);
    module.hot.accept();
} else {
    console.log('production')
    loadableReady(() => renderFunc(hydrate))
}