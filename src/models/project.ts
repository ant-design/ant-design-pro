import { queryProjectNotice } from '@/services/api';
import { Effect } from '@/models/connect';
import { Reducer } from 'redux';

export interface ProjectNoticeItem {
  description: string;
  href: string;
  id: string;
  logo: string;
  member: string;
  memberLink: string;
  title: string;
  updatedAt: string;
}

export interface ProjectModelState {
  notice: ProjectNoticeItem[];
}

export interface ProjectModel {
  namespace: 'project';
  state: ProjectModelState;
  effects: {
    fetchNotice: Effect;
  };
  reducers: {
    saveNotice: Reducer<any>;
  };
}
const ProjectModel: ProjectModel = {
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
