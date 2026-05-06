import component from './pt-BR/component';
import globalHeader from './pt-BR/globalHeader';
import menu from './pt-BR/menu';
import network from './pt-BR/network';
import pages from './pt-BR/pages';
import settingDrawer from './pt-BR/settingDrawer';
import settings from './pt-BR/settings';

export default {
  'navBar.lang': 'Idiomas',
  'layout.user.link.help': 'ajuda',
  'layout.user.link.privacy': 'política de privacidade',
  'layout.user.link.terms': 'termos de serviços',
  'app.preview.down.block': 'Download this page to your local project',
  ...globalHeader,
  ...menu,
  ...settingDrawer,
  ...settings,
  ...network,
  ...component,
  ...pages,
};
