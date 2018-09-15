import { setLocale, getLocale } from 'umi/locale';

export function changLang() {
  const locale = getLocale();
  if (!locale || locale === 'zh-CN') {
    setLocale('en-US');
  } else {
    setLocale('zh-CN');
  }
}

export function getCopyrightInfo() {
  return '2018 蚂蚁金服体验技术部出品';
}

export function getApplicationTitle() {
  return 'Ant Design';
}
