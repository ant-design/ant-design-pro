import analysis from './da-DK/analysis';
import exception from './da-DK/exception';
import form from './da-DK/form';
import globalHeader from './da-DK/globalHeader';
import login from './da-DK/login';
import menu from './da-DK/menu';
import monitor from './da-DK/monitor';
import result from './da-DK/result';
import settingDrawer from './da-DK/settingDrawer';
import settings from './da-DK/settings';
import pwa from './da-DK/pwa';
import component from './da-DK/component';
import editor from './da-DK/editor';

export default {
  'navBar.lang': 'sprog',
  'layout.user.link.help': 'Hjælp',
  'layout.user.link.privacy': 'Privatliv',
  'layout.user.link.terms': 'Vilkår',
  'app.home.introduce': 'Introduktion',
  'app.forms.basic.title': 'Basic Form',
  'App.forms.basic.description': 'Formular sider bruges til at indsamle eller validere information til brugere. Grundlæggende formularer er almindelige i form scenarier, hvor der er færre dataposter. ',
  ...analysis,
  ...exception,
  ...form,
  ...globalHeader,
  ...login,
  ...menu,
  ...monitor,
  ...result,
  ...settingDrawer,
  ...settings,
  ...pwa,
  ...component,
  ...editor,
};
