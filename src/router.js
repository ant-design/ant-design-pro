import React from 'react';
import { routerRedux, Route, Switch } from 'dva/router';
import { LocaleProvider, Spin } from 'antd';
import dynamic from 'dva/dynamic';
import { addLocaleData, IntlProvider } from 'react-intl';
import { getRouterData } from './common/router';
import Authorized from './utils/Authorized';
import { getQueryPath } from './utils/utils';
import styles from './index.less';
import enLocale from './locale/en-US';
import cnLocale from './locale/zh-CN';

const { ConnectedRouter } = routerRedux;
const { AuthorizedRoute } = Authorized;
dynamic.setDefaultLoadingComponent(() => {
  return <Spin size="large" className={styles.globalSpin} />;
});

function getLang() {
  return (window.localStorage && localStorage.getItem('locale')) ||
    (navigator.language || navigator.browserLanguage).toLowerCase() === 'en-us'
    ? 'en-US'
    : 'zh-CN';
}

function RouterConfig({ history, app }) {
  const routerData = getRouterData(app);
  const UserLayout = routerData['/user'].component;
  const BasicLayout = routerData['/'].component;
  const appLocale = getLang() === 'zh-CN' ? cnLocale : enLocale;
  addLocaleData(appLocale.data);
  return (
    <IntlProvider locale={appLocale.locale} messages={appLocale.messages}>
      <LocaleProvider locale={appLocale.antd}>
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
      </LocaleProvider>
    </IntlProvider>
  );
}

export default RouterConfig;
