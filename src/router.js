import React from 'react';
import { routerRedux, Route, Switch } from 'dva/router';
import { getRouterData } from './common/router';
import Authorized from './utils/Authorized';
import { getQueryPath } from './utils/utils';

const { ConnectedRouter } = routerRedux;
const { AuthorizedRoute } = Authorized;

function RouterConfig({ history, app }) {
  const routerData = getRouterData(app);
  const UserLayout = routerData['/user'].component;
  const BasicLayout = routerData['/'].component;
  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Route path="/user" component={UserLayout} />
        <AuthorizedRoute
          path="/"
          render={props => <BasicLayout {...props} />}
          authority={['admin', 'user']}
          redirectPath={getQueryPath('/user/login', {
            redirect: window.location.href,
          })}
        />
      </Switch>
    </ConnectedRouter>
  );
}

export default RouterConfig;
