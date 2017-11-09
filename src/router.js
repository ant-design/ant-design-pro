import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import dynamic from 'dva/dynamic';

function RouterConfig({ history, app }) {
  const BasicLayout = dynamic({
    app,
    component: () => import('./layouts/BasicLayout'),
  });
  const UserLayout = dynamic({
    app,
    component: () => import('./layouts/UserLayout'),
  });

  return (
    <LocaleProvider locale={zhCN}>
      <Router history={history}>
        <Switch>
          <Route path="/user" component={UserLayout} />
          <Route path="/" component={BasicLayout} />
        </Switch>
      </Router>
    </LocaleProvider>
  );
}

export default RouterConfig;
