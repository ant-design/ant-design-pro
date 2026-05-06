import component from './ja-JP/component';
import globalHeader from './ja-JP/globalHeader';
import menu from './ja-JP/menu';
import network from './ja-JP/network';
import pages from './ja-JP/pages';
import settingDrawer from './ja-JP/settingDrawer';
import settings from './ja-JP/settings';

export default {
  'navBar.lang': '言語',
  'layout.user.link.help': 'ヘルプ',
  'layout.user.link.privacy': 'プライバシー',
  'layout.user.link.terms': '利用規約',
  'app.preview.down.block':
    'このページをローカルプロジェクトにダウンロードしてください',
  ...globalHeader,
  ...menu,
  ...settingDrawer,
  ...settings,
  ...network,
  ...component,
  ...pages,
};
