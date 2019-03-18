import { MenuTheme } from 'antd/es/menu';

export type ContentWidth = 'Fluid' | 'Fixed';

export interface DefaultSettings {
  /**
   * theme for nav menu
   */
  navTheme: MenuTheme;
  /**
   * primary color of ant design
   */
  primaryColor: string;
  /**
   * nav menu position: `sidemenu` or `topmenu`
   */
  layout: 'sidemenu' | 'topmenu';
  /**
   * layout of content: `Fluid` or `Fixed`, only works when layout is topmenu
   */
  contentWidth: ContentWidth;
  /**
   * sticky header
   */
  fixedHeader: boolean;
  /**
   * auto hide header
   */
  autoHideHeader: boolean;
  /**
   * sticky siderbar
   */
  fixSiderbar: boolean;
  menu: { disableLocal: boolean };
  title: string;
  pwa: boolean;
  /**
   * your iconfont Symbol Scrip Url
   * eg：`//at.alicdn.com/t/font_1039637_btcrd5co4w.js`
   * 注意：如果需要图标多色，Iconfont图标项目里要进行批量去色处理
   */
  iconfontUrl: string;
  colorWeak: boolean;
}

export default {
  navTheme: 'dark',
  primaryColor: '#1890FF',
  layout: 'sidemenu',
  contentWidth: 'Fluid',
  fixedHeader: false,
  autoHideHeader: false,
  fixSiderbar: false,
  colorWeak: false,
  menu: {
    disableLocal: false,
  },
  title: 'Ant Design Pro',
  pwa: true,
  iconfontUrl: '',
} as DefaultSettings;
