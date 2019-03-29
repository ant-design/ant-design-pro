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
declare module 'rc-animate';
declare module 'omit.js';
declare module 'react-copy-to-clipboard';
declare module 'react-fittext';
declare module '@antv/data-set';
declare var APP_TYPE: string;
declare module 'memoize-one' {
  function memoizeOne<T extends (...args: any[]) => any>(
    resultFn: T,
    isEqual?: (a: any, b: any, index: number) => boolean,
  ): T;
  export default memoizeOne;
}
declare module 'antd' {
  import { Omit } from 'antd/es/_util/type';
  import Group from 'antd/es/button/button-group';
  import { BaseButtonProps, ButtonHTMLType } from 'antd/es/button/button';
  type AnchorButtonProps = {
    href: string;
    target?: string;
    onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  } & BaseButtonProps &
    Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'type'>;
  type NativeButtonProps = {
    htmlType?: ButtonHTMLType;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
  } & BaseButtonProps &
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'>;
  type ButtonProps = AnchorButtonProps | NativeButtonProps;
  interface ButtonState {
    loading?:
      | boolean
      | {
          delay?: number;
        };
    hasTwoCNChar: boolean;
  }
  export class Button extends React.Component<ButtonProps, ButtonState> {
    static Group: typeof Group;
    constructor(props: ButtonProps);
    render(): JSX.Element;
  }
  export * from 'antd/es';
}
