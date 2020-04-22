import { MenuDataItem } from '@ant-design/pro-layout';
import { Settings as SettingModelState } from '@ant-design/pro-layout/es/defaultSettings';
import { GlobalModelState } from './global';
import { UserModelState } from './user';
import { StateType } from './login';

export { GlobalModelState, SettingModelState, UserModelState };

export interface Loading {
  global: boolean;
  effects: { [key: string]: boolean | undefined };
  models: {
    global?: boolean;
    menu?: boolean;
    setting?: boolean;
    user?: boolean;
    login?: boolean;
  };
}

export interface ConnectState {
  global: GlobalModelState;
  loading: Loading;
  settings: SettingModelState;
  user: UserModelState;
  login: StateType;
}

export interface Route extends MenuDataItem {
  routes?: Route[];
}
