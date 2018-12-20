import {
  fakeTeamCreate,
  fakeTeamList,
  fakeTeamMembers,
  fakeTeamMemberJoin,
  fakeTeamMembersInvite,
} from '@/services/api';
import router from 'umi/router';
import { currentTeamSet, currentTeamGet } from '@/utils/team';

export default {
  namespace: 'team',

  state: {
    total: 0,
    list: [],
    members: [],
    inviteToken: '',
    status: '',
    joinInfo: '',
    joinStatus: '',
  },

  effects: {
    *create({ payload }, { call }) {
      const response = yield call(fakeTeamCreate, payload);
      if (response.status === '__OK__') {
        currentTeamSet(response.team_id);
        router.push('/');
      }
    },
    *list(_, { call, put }) {
      const response = yield call(fakeTeamList);

      yield put({
        type: 'queryTeams',
        payload: Array.isArray(response.teams) ? response.teams : [],
      });
    },
    *members(_, { call, put }) {
      const response = yield call(fakeTeamMembers, {
        team_id: currentTeamGet(),
      });
      yield put({
        type: 'queryMembers',
        payload: response,
      });
    },
    *memberInvite(_, { call, put }) {
      const response = yield call(fakeTeamMembersInvite, {
        team_id: currentTeamGet(),
      });
      yield put({
        type: 'memberInviteLink',
        payload: response,
      });
    },
    *select({ payload }) {
      currentTeamSet(payload.team_id);
      yield router.push('/');
    },
    *join({ payload }, { call, put }) {
      const response = yield call(fakeTeamMemberJoin, payload);
      yield put({
        type: 'memberJoin',
        payload: response,
      });
    },
  },

  reducers: {
    queryTeams(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    queryMembers(state, action) {
      return {
        ...state,
        members: Array.isArray(action.payload.members) ? action.payload.members : [],
        total: action.payload.total,
      };
    },
    memberInviteLink(state, action) {
      return {
        ...state,
        inviteToken: action.payload.invite_token ? action.payload.invite_token : '',
        status: action.payload.status,
      };
    },
    memberJoin(state, action) {
      return {
        ...state,
        joinInfo: action.payload.info,
        joinStatus: action.payload.status,
      };
    },
  },
};
