import { AnyAction } from 'redux';
import { connect as DvaConnect, EffectsCommandMap } from 'dva';
import { MenuDataItem } from '@ant-design/pro-layout';
import { RouterTypes } from 'umi';
import { GlobalModelState } from './global';
import { DefaultSettings as SettingModelState } from '../../config/defaultSettings';
import { UserModelState } from './user';

export { GlobalModelState, SettingModelState, UserModelState };

export interface Loading {
  global: boolean;
  effects: { [key: string]: boolean | undefined };
  models: {
    global?: boolean;
    menu?: boolean;
    setting?: boolean;
    user?: boolean;
  };
}

export interface ConnectState {
  global: GlobalModelState;
  loading: Loading;
  settings: SettingModelState;
  user: UserModelState;
}

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: ConnectState) => T) => T },
) => void;

/**
 * @type P: Type of payload
 * @type C: Type of callback
 */
export type Dispatch = <P = any, C = (payload: P) => void>(action: {
  type: string;
  payload?: P;
  callback?: C;
  [key: string]: any;
}) => any;

export interface Route extends MenuDataItem {
  routes?: Route[];
}

/**
 * @type T: Params matched in dynamic routing
 */
export interface ConnectProps<T = {}> extends Partial<RouterTypes<Route, T>> {
  dispatch?: Dispatch;
}

type AnyComponentClass<P = {}, S = any> = React.ComponentClass<P, S> | React.FunctionComponent<P>;

/**
 * @type P: props
 * @type R: without `Partial<>`
 */
type ConnectType = <S>(
  f: (state: ConnectState) => S,
) => <P, R extends boolean = true>(
  c: AnyComponentClass<any>,
) => React.FunctionComponent<
  R extends false
    ? Partial<Omit<P, keyof ConnectProps | keyof S>>
    : Omit<P, keyof ConnectProps | keyof S>
>;

export const connect: ConnectType = DvaConnect as any;
