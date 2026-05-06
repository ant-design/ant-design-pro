import component from './fa-IR/component';
import globalHeader from './fa-IR/globalHeader';
import menu from './fa-IR/menu';
import network from './fa-IR/network';
import pages from './fa-IR/pages';
import settingDrawer from './fa-IR/settingDrawer';
import settings from './fa-IR/settings';

export default {
  'navBar.lang': 'زبان ها  ',
  'layout.user.link.help': 'کمک',
  'layout.user.link.privacy': 'حریم خصوصی',
  'layout.user.link.terms': 'مقررات',
  'app.preview.down.block': 'این صفحه را در پروژه محلی خود بارگیری کنید',
  ...globalHeader,
  ...menu,
  ...settingDrawer,
  ...settings,
  ...network,
  ...component,
  ...pages,
};
