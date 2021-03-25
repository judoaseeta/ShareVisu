import React from 'react';
import { Route } from 'react-router-dom';
// pages
import CreatePlot from './client/component/createPlot/createPlot';
import PlotBase from './client/pages/plots/';
import Plot from './client/pages/plotViews/plot';
import Main from './client/pages/main';
import Nav from './client/component/nav';
// import 
import './style/app.scss';

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
                component={Main}
            />
            <Route 
                path="/plot/:sk"
                component={Plot}
            />
            <Route 
                path="/createPlot"
                component={CreatePlot}
                exact
            />
            <Route 
                path="/createPlot/:plot"
                component={PlotBase}
            />
        </article>
    )
}
export default App;
