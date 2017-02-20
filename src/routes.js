import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './App';
import Landing from './Landing';

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Landing}/>
  </Route>
);

export default routes;
