import router from 'umi/router';
import { message } from 'antd';
import { addDepart, query, queryById, updateDepart, deleteById } from '@/services/depart';
export default {
  namespace: 'depart',
  state: {
    data: {
      list: [],
      pagination: {},
    },
    depart: {},
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(query, payload);
      yield put({
        type: 'fetchSave',
        payload: response,
      });
    },
    *add({ payload }, { call, put }) {
      const response = yield call(addDepart, payload);
      console.log(response);
      if (response.code === 0) {
        message.success('保存成功', 2);
        router.push('/basic-management/depart/list');
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
      const response = yield call(updateDepart, payload);
      if (response.code === 0) {
        message.success('修改成功', 2);
        router.push('/basic-management/depart/list');
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
          list: action.payload.data,
        },
      };
    },
    getSave(state, action) {
      return {
        ...state,
        depart: action.payload.data || {},
      };
    },
  },
};
