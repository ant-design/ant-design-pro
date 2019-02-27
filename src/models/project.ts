import { queryProjectNotice } from '@/services/api';
import { Effect } from 'dva';
import { Reducer } from 'redux';

export interface IProjectModelState {
  notice: any[];
}

export interface IProjectModel {
  namespace: 'project';
  state: IProjectModelState;
  effects: {
    fetchNotice: Effect;
  };
  reducers: {
    saveNotice: Reducer<any>;
  };
}
const ProjectModel: IProjectModel = {
  namespace: 'project',

  state: {
    notice: [],
  },

  effects: {
    *fetchNotice(_, { call, put }) {
      const response = yield call(queryProjectNotice);
      yield put({
        type: 'saveNotice',
        payload: Array.isArray(response) ? response : [],
      });
    },
  },

  reducers: {
    saveNotice(state, action) {
      return {
        ...state,
        notice: action.payload,
      };
    },
  },
};

export default ProjectModel;
