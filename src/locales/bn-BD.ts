import component from './bn-BD/component';
import globalHeader from './bn-BD/globalHeader';
import menu from './bn-BD/menu';
import pages from './bn-BD/pages';
import pwa from './bn-BD/pwa';
import settingDrawer from './bn-BD/settingDrawer';
import settings from './bn-BD/settings';

export default {
  'navBar.lang': 'ভাষা',
  'layout.user.link.help': 'সহায়তা',
  'layout.user.link.privacy': 'গোপনীয়তা',
  'layout.user.link.terms': 'শর্তাদি',
  'app.copyright.produced': 'প্রযোজনা করেছেন অ্যান্ট ফিনান্সিয়াল এক্সপেরিয়েন্স ডিপার্টমেন্ট',
  'app.preview.down.block': 'আপনার স্থানীয় প্রকল্পে এই পৃষ্ঠাটি ডাউনলোড করুন',
  'app.welcome.link.fetch-blocks': 'সমস্ত ব্লক পান',
  'app.welcome.link.block-list':
    '`block` ডেভেলপমেন্ট এর উপর ভিত্তি করে দ্রুত স্ট্যান্ডার্ড, পৃষ্ঠাসমূহ তৈরি করুন।',
  ...globalHeader,
  ...menu,
  ...settingDrawer,
  ...settings,
  ...pwa,
  ...component,
  ...pages,
};
