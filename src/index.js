import '@babel/polyfill';
import 'url-polyfill';
import dva from 'dva';

import createHistory from 'history/createHashHistory';
// user BrowserHistory
// import createHistory from 'history/createBrowserHistory';
import createLoading from 'dva-loading';
import 'moment/locale/zh-cn';
import FastClick from 'fastclick';
import './rollbar';
import { getAuthority, setAuthority } from './utils/authority';

import './index.less';
// 1. Initialize
const app = dva({
  history: createHistory(),
  initialState: {
    login: {
      currentAuthority: getAuthority(),
    },
  },
});

// 2. Plugins
app.use(createLoading());

// 3. Register global model
app.model(require('./models/global').default);
app.model(require('./models/login').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');


FastClick.attach(document.body);

let prevAuthority;
app._store.subscribe(() => { // eslint-disable-line no-underscore-dangle
  const { login, register } = app._store.getState(); // eslint-disable-line no-underscore-dangle
  if (prevAuthority !== login.currentAuthority) {
    prevAuthority = login.currentAuthority;
    setAuthority(login.currentAuthority);
  }

  if (prevAuthority !== register.currentAuthority) {
    prevAuthority = register.currentAuthority;
    setAuthority(register.currentAuthority);
  }
});

export default app._store;  // eslint-disable-line
