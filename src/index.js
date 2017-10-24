import dva from 'dva';
import G2 from 'g2';
import 'moment/locale/zh-cn';
import models from './models';
// import { browserHistory } from 'dva/router';
import './index.less';

G2.track(false);

// 1. Initialize
const app = dva({
  // history: browserHistory,
});

// 2. Plugins
// app.use({});

// 3. Model move to router
models.forEach((m) => {
  app.model(m);
});

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
