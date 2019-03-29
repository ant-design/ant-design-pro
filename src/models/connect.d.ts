import { Route } from '@/components/SiderMenu';
import { GeographicModelState } from '@/pages/Account/Settings/models/geographic';
import { ActivitiesModelState } from '@/pages/Dashboard/models/activities';
import { ChartModelState } from '@/pages/Dashboard/models/chart';
import { MonitorModelState } from '@/pages/Dashboard/models/monitor';
import { FormModelState } from '@/pages/Forms/models/form';
import { EffectsCommandMap } from 'dva';
import { AnyAction } from 'redux';
import { RouterTypes } from 'umi';
import { GlobalModelState } from './global';
import { ListModelState } from './list';
import { LoginModelState } from './login';
import { MenuModelState } from './menu';
import { ProjectModelState } from './project';
import { SettingModelState } from './setting';
import { UserModelState } from './user';

export {
  GeographicModelState,
  ActivitiesModelState,
  ChartModelState,
  MonitorModelState,
  FormModelState,
  GlobalModelState,
  ListModelState,
  LoginModelState,
  MenuModelState,
  ProjectModelState,
  SettingModelState,
  UserModelState,
};

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
    activities?: boolean;
    chart?: boolean;
    form?: boolean;
    geographic?: boolean;
    global?: boolean;
    list?: boolean;
    login?: boolean;
    menu?: boolean;
    monitor?: boolean;
    project?: boolean;
    setting?: boolean;
    user?: boolean;
  };
}

export interface ConnectState {
  activities?: ActivitiesModelState;
  chart?: ChartModelState;
  form?: FormModelState;
  geographic?: GeographicModelState;
  global: GlobalModelState;
  list: ListModelState;
  login: LoginModelState;
  loading: Loading;
  menu: MenuModelState;
  monitor?: MonitorModelState;
  project: ProjectModelState;
  setting: SettingModelState;
  user: UserModelState;
}

/**
 * @type T: Params matched in dynamic routing
 */
export interface ConnectProps<T extends { [key: string]: any } = {}>
  extends Partial<RouterTypes<Route>> {
  dispatch?: Dispatch;
}

export default ConnectState;
