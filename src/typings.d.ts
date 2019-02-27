declare module '*.css';
declare module '*.less';
declare module '*.scss';
declare module '*.sass';
declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.bmp';
declare module '*.tiff';
declare type Route =
  | {
      authority?: never;
      component?: never;
      hideChildrenInMenu?: never;
      icon?: never;
      name?: never;
      path: string;
      redirect: string;
      routes?: never;
      Routes?: never;
    }
  | {
      authority?: string[];
      component?: string;
      hideChildrenInMenu?: boolean;
      icon?: string;
      name?: string;
      path?: string;
      redirect?: never;
      routes?: Route[];
      Routes?: string[];
    };
