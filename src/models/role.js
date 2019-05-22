import router from 'umi/router';
import { message } from 'antd';
import { query as queryRoles, addRole, queryById, updateRole, deleteById } from '@/services/role';
export default {
  namespace: 'role',
  state: {
    data: {
      list: [],
      pagination: {},
    },
    role: {},
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryRoles, payload);
      yield put({
        type: 'fetchSave',
        payload: response,
      });
    },
    *add({ payload }, { call, put }) {
      const response = yield call(addRole, payload);
      console.log(response);
      if (response.code === 0) {
        message.success('保存成功', 2);
        router.push('/system-management/role/list');
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
      const response = yield call(updateRole, payload);
      if (response.code === 0) {
        message.success('修改成功', 2);
        router.push('/system-management/role/list');
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
  },
  reducers: {
    fetchSave(state, action) {
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
    getSave(state, action) {
      return {
        ...state,
        role: action.payload.data || {},
      };
    },
  },
};
