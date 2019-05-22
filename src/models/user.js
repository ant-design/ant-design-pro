import { query as queryUsers, queryCurrent } from '@/services/user';

export default {
  namespace: 'user',

  state: {
    data: {
      list: [],
      pagination: {},
    },
    currentUser: {},
    user: {},
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryUsers, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *add({ payload }, { call, put }) {
      const response = yield call(addUser, payload);
      console.log(response);
      if (response.code === 0) {
        message.success('保存成功', 2);
        router.push('/settings/user/list');
      } else {
        message.error(response.msg);
      }
    },
    *get({ payload }, { call, put }) {
      const response = yield call(queryById, payload);
      yield put({
        type: 'getSave',
        payload: response,
      });
    },
    *update({ payload }, { call, put }) {
      const response = yield call(updateUser, payload);
      if (response.code === 0) {
        message.success('修改成功', 2);
        router.push('/settings/user/list');
      } else {
        message.error(response.msg);
      }
    },
    *delete({ payload }, { call, put }) {
      const response = yield call(deleteById, payload);
      if (response.code === 0) {
        message.success('删除成功', 2);
        yield put({
          type: 'fetch',
          payload: {},
        });
      } else {
        message.error(response.msg);
      }
    },
    *disable({ payload }, { call, put }) {
      const response = yield call(disableUser, payload);
      if (response.code === 0) {
        message.success('操作成功', 2);
        yield put({
          type: 'fetch',
          payload: {},
        });
      } else {
        message.error(response.msg);
      }
    },
    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      yield put({
        type: 'saveCurrentUser',
        payload: response.data,
      });
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: {
          list: action.payload.data.records,
          pagination: {
            total: action.payload.data.total,
            pageSize: action.payload.data.size,
            current: action.payload.data.current,
          },
        },
      };
    },
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload || {},
      };
    },
    getSave(state, action) {
      return {
        ...state,
        user: action.payload.data || {},
      };
    },
    changeNotifyCount(state, action) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
  },
};
