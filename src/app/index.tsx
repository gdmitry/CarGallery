import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { CarGrid, CarConfigurator, Checkout } from 'app/containers';
import { hot } from 'react-hot-loader';
import './index.scss';

export const App = hot(module)(() => (
  <Switch>
    <Route exact path="/">
      <Redirect to='/models' />
    </Route>
    <Route path='/models/:code/:config' component={CarConfigurator} />
    <Route path='/models' component={CarGrid} />
    <Route path='/checkout/:status' component={Checkout} />
  </Switch>
));
