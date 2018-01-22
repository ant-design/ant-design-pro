import React from 'react';
import { routerRedux, Route, Switch } from 'dva/router';
import { LocaleProvider, Spin } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import dynamic from 'dva/dynamic';
import { getRouterData } from './common/router';
import styles from './index.less';
import LoadingPage from './loadingPage';
import AuthorizedManger from './utils/AuthorizedManger';

const { ConnectedRouter } = routerRedux;

dynamic.setDefaultLoadingComponent(() => {
  return <Spin size="large" className={styles.globalSpin} />;
});

function RouterConfig({ history, app }) {
  const routerData = getRouterData(app);
  const UserLayout = routerData['/user'].component;
  const BasicLayout = routerData['/'].component;
  return (
    <LocaleProvider locale={zhCN}>
      <LoadingPage
        render={() => {
          const { AuthorizedRoute } = AuthorizedManger.getAuthorized();
          return (
            <ConnectedRouter history={history}>
              <Switch>
                <Route
                  path="/user"
                  render={props => <UserLayout {...props} />}
                />
                <AuthorizedRoute
                  path="/"
                  render={props => <BasicLayout {...props} />}
                  authority={['admin', 'user']}
                  redirectPath="/user/login"
                />
              </Switch>
            </ConnectedRouter>
          );
        }}
      />
    </LocaleProvider>
  );
}

export default RouterConfig;
