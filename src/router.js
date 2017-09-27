import React from 'react';
import { Router, Route, Switch, Redirect } from 'dva/router';
import BasicLayout from './layouts/BasicLayout';
import UserLayout from './layouts/UserLayout';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/user" component={UserLayout} />
        <Route path="/" component={BasicLayout} />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
