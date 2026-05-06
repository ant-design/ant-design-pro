import component from './bn-BD/component';
import globalHeader from './bn-BD/globalHeader';
import menu from './bn-BD/menu';
import network from './bn-BD/network';
import pages from './bn-BD/pages';
import settingDrawer from './bn-BD/settingDrawer';
import settings from './bn-BD/settings';

export default {
  'navBar.lang': 'ভাষা',
  'layout.user.link.help': 'সহায়তা',
  'layout.user.link.privacy': 'গোপনীয়তা',
  'layout.user.link.terms': 'শর্তাদি',
  'app.preview.down.block': 'আপনার স্থানীয় প্রকল্পে এই পৃষ্ঠাটি ডাউনলোড করুন',
  ...globalHeader,
  ...menu,
  ...settingDrawer,
  ...settings,
  ...network,
  ...component,
  ...pages,
};
