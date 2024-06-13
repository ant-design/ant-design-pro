import component from './fa-IR/component';
import globalHeader from './fa-IR/globalHeader';
import menu from './fa-IR/menu';
import pages from './fa-IR/pages';
import pwa from './fa-IR/pwa';
import settingDrawer from './fa-IR/settingDrawer';
import settings from './fa-IR/settings';

export default {
  'navBar.lang': 'زبان ها  ',
  'layout.user.link.help': 'کمک',
  'layout.user.link.privacy': 'حریم خصوصی',
  'layout.user.link.terms': 'مقررات',
  'app.preview.down.block': 'این صفحه را در پروژه محلی خود بارگیری کنید',
  'app.welcome.link.fetch-blocks': 'دریافت تمام بلوک',
  'app.welcome.link.block-list': 'به سرعت صفحات استاندارد مبتنی بر توسعه "بلوک" را بسازید',
  ...globalHeader,
  ...menu,
  ...settingDrawer,
  ...settings,
  ...pwa,
  ...component,
  ...pages,
};
