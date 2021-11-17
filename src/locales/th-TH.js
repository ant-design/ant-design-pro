import component from './th-TH/component';
import globalHeader from './th-TH/globalHeader';
import menu from './th-TH/menu';
import pages from './th-TH/pages';
import pwa from './th-TH/pwa';
import settingDrawer from './th-TH/settingDrawer';
import settings from './th-TH/settings';
export default {
  'navBar.lang': 'ภาษา',
  'layout.user.link.help': 'ช่วยเหลือ',
  'layout.user.link.privacy': 'ความเป็นส่วนตัว',
  'layout.user.link.terms': 'เงื่อนไขการให้บริการ',
  'app.copyright.produced': 'ผลิตโดยฝ่ายเทคโนโลยี ของ Ant Group',
  'app.preview.down.block': 'ดาวน์โหลดหน้านี้ไปยังโครงการในพื้นที่ของคุณ',
  'app.welcome.link.fetch-blocks': 'รับบล็อกทั้งหมด',
  'app.welcome.link.block-list': 'การพัฒนาบล็อกมาตรฐานสามารถสร้าหน้าอย่างรวดเร็ว',
  ...globalHeader,
  ...menu,
  ...settingDrawer,
  ...settings,
  ...pwa,
  ...component,
  ...pages,
};
