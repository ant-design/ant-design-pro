import appLocaleData from 'react-intl/locale-data/zh';
import antdZh from 'antd/lib/locale-provider/zh_CN';
// import zhMessages from '../../locales/zh.json';

export default {
  locale: 'zh-CN',
  data: appLocaleData,
  antd: antdZh,
  messages: {
    'app.home.introduce': '介绍',
    'app.analysis.test': '工专路 {no} 号店',
  // ...zhMessages,
  },
};
