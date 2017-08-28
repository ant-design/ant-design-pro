import dva from 'dva';
// import { browserHistory } from 'dva/router';
import 'moment/locale/zh-cn';
import models from './models';

import './index.less';

// 1. Initialize
const app = dva({
  // history: browserHistory,
});

// 2. Plugins
// app.use({});

// 3. Model
models.forEach((m) => {
  app.model(m);
});

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
