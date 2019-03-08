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
declare var APP_TYPE: string;
declare module 'lodash-decorators/debounce' {
  import { Cancelable } from 'lodash';
  import { DebounceOptions } from 'lodash-decorators/shared';

  function Debounce<T>(
    wait?: number,
    options?: DebounceOptions
  ): (
    target: Object,
    propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<T & Cancelable>
  ) => TypedPropertyDescriptor<T> | void;
  export default Debounce;
}
