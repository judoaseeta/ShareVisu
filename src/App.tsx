import React from 'react';
import { Route } from 'react-router-dom';
import loadable from '@loadable/component';


import Nav from './client/component/nav';
// import 
import './style/app.scss';
// pages 
const LoadPlotView = loadable(() => import('./client/pages/plotViews/plot'));
const LoadCraetePlot = loadable(() => import('./client/component/createPlot/createPlot'));
const LoadPlotBase = loadable(() => import('./client/pages/plots/'));
const LoadMain = loadable(() => import('./client/pages/main'));
const App: React.FC<{}> = () => {
    return (
        <article className="app">
            <Route 
                path="*"
                component={Nav}
            />
            <Route 
                path="/"
                exact
                component={LoadMain}
            />
            <Route 
                path="/plot/:sk"
                component={LoadPlotView}
            />
            <Route 
                path="/createPlot"
                component={LoadCraetePlot}
                exact
            />
            <Route 
                path="/createPlot/:plot"
                component={LoadPlotBase}
            />
        </article>
    )
}
export default App;
