import '@babel/polyfill';
import dva from 'dva';
import 'moment/locale/zh-cn';
import FastClick from 'fastclick';
import './rollbar';
import onError from './error';
// import browserHistory from 'history/createBrowserHistory';
import './index.less';
// 1. Initialize
const app = dva({
  // history: browserHistory(),
  onError,
});

// 2. Plugins
// app.use({});

// 3. Register global model
app.model(require('./models/global').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
FastClick.attach(document.body);
