import {
  queryProjectNotice,
  projectGroupCreate,
  projectGroupTree,
  projectGroupDelete,
  projectCreate,
} from '@/services/api';

import { currentTeamGet } from '@/utils/team';
import { showMessageByResponse } from '@/utils/utils';

export default {
  namespace: 'project',

  state: {
    notice: [],
    tree: [],
  },

  effects: {
    *fetchNotice(_, { call, put }) {
      const response = yield call(queryProjectNotice);
      yield put({
        type: 'saveNotice',
        payload: Array.isArray(response) ? response : [],
      });
    },
    *groupTree(_, { call, put }) {
      const response = yield call(projectGroupTree, {
        team_id: currentTeamGet(),
      });

      showMessageByResponse(response);

      if (response.status === '__OK__') {
        yield put({
          type: 'queryGroups',
          payload: response.groups,
        });
      }
    },
    *groupCreate({ payload }, { call, put }) {
      const response = yield call(projectGroupCreate, {
        ...payload,
        team_id: currentTeamGet(),
      });

      showMessageByResponse(response);

      if (response.status === '__OK__') {
        yield put({
          type: 'queryGroups',
          payload: response.groups,
        });
      }
    },
    *groupDelete({ payload }, { call, put }) {
      const response = yield call(projectGroupDelete, {
        ...payload,
        team_id: currentTeamGet(),
      });

      showMessageByResponse(response);

      if (response.status === '__OK__') {
        yield put({
          type: 'queryGroups',
          payload: response.groups,
        });
      }
    },
    *create({ payload }, { call }) {
      const response = yield call(projectCreate, {
        ...payload,
        team_id: currentTeamGet(),
      });

      showMessageByResponse(response);

      if (response.status === '__OK__') {
        console.log('Project creat sucess.');
      }
    },
  },

  reducers: {
    saveNotice(state, action) {
      return {
        ...state,
        notice: action.payload,
      };
    },
    queryGroups(state, action) {
      return {
        ...state,
        tree: action.payload,
      };
    },
  },
};
