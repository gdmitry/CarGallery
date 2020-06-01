import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { CarGrid, CarConfigurator } from 'app/containers';
import { hot } from 'react-hot-loader';
import './index.scss';

export const App = hot(module)(() => (
  <Switch>
    <Route exact path="/">
      <Redirect to='/models' />
    </Route>
    <Route exact path='/models/:code/:config' component={CarConfigurator} />
    <Route exact path='/models' component={CarGrid} />
  </Switch>
));
