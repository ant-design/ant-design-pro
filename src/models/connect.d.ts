import { EffectsCommandMap } from 'dva';
import { AnyAction } from 'redux';
import { GlobalModelState } from './global';
import { MenuModelState } from './menu';
import { UserModelState } from './user';
import { DefaultSettings as SettingModelState } from '../../config/defaultSettings';

export { GlobalModelState, MenuModelState, SettingModelState, UserModelState };

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
  menu: MenuModelState;
  setting: SettingModelState;
  user: UserModelState;
}

/**
 * @type T: Params matched in dynamic routing
 * @type R: Instance type of ref
 */
export interface ConnectProps<T extends { [key: string]: any } = {}, R = any>
  extends React.Props<R> {
  dispatch?: Dispatch;
  location?: Location;
  match?: {
    isExact: boolean;
    params: T;
    path: string;
    url: string;
  };
}

export default ConnectState;
