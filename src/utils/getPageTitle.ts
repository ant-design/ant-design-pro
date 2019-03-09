import isEqual from 'lodash/isEqual';
import memoizeOne from 'memoize-one';
import pathToRegexp from 'path-to-regexp';
import { formatMessage } from 'umi-plugin-locale';
import { menu, title } from '../defaultSettings';

export const matchParamsPath = (pathname: string, breadcrumbNameMap: object): IRouterData => {
  const pathKey = Object.keys(breadcrumbNameMap).find(key => pathToRegexp(key).test(pathname));
  return breadcrumbNameMap[pathKey];
};

interface IRouterData {
  name: string;
  locale: string;
  authority?: string[];
  children?: any[];
  icon?: string;
  path: string;
}

const getPageTitle = (pathname: string, breadcrumbNameMap: object): string => {
  const currRouterData = matchParamsPath(pathname, breadcrumbNameMap);
  if (!currRouterData) {
    return title;
  }
  const pageName = menu.disableLocal
    ? currRouterData.name
    : formatMessage({
        id: currRouterData.locale || currRouterData.name,
        defaultMessage: currRouterData.name,
      });

  return `${pageName} - ${title}`;
};

export default memoizeOne(getPageTitle, isEqual);
