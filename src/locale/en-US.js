import appLocaleData from 'react-intl/locale-data/en';
import antdEn from 'antd/lib/locale-provider/en_US';
// import enMessages from '../../locales/en.json';

export default {
  locale: 'en-US',
  data: appLocaleData,
  antd: antdEn,
  messages: {
    'app.home.introduce': 'introduce',
    'app.analysis.test': 'Gongzhuan road No.{no} shop',
  // ...enMessages,
  },
};
