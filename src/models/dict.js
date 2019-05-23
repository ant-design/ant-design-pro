import { addDict, addDictItem, deleteById, deleteItemById, query, updateDict, updateDictItem, queryByCodeType } from '@/services/dict';
import { message } from 'antd';
export default {
  namespace: 'dict',
  state: {
    data: {
      list: [],
      pagination: {},
    },
    dict: {},
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
      const response = yield call(addDict, payload);
      console.log(response);
      if (response.code === 0) {
        message.success('保存成功', 2);
        yield put({
          type: 'fetch',
          payload: {},
        });
      } else {
        message.error(response.msg);
      }
    },
    *addItem({ payload }, { call, put }) {
      const response = yield call(addDictItem, payload);
      console.log(response);
      if (response.code === 0) {
        message.success('保存成功', 2);
        yield put({
          type: 'fetch',
          payload: {},
        });
      } else {
        message.error(response.msg);
      }
    },
    *update({ payload }, { call, put }) {
      const response = yield call(updateDict, payload);
      if (response.code === 0) {
        message.success('修改成功', 2);
        yield put({
          type: 'fetch',
          payload: {},
        });
      } else {
        message.error(response.msg);
      }
    },
    *updateItem({ payload }, { call, put }) {
      const response = yield call(updateDictItem, payload);
      if (response.code === 0) {
        message.success('修改成功', 2);
        yield put({
          type: 'fetch',
          payload: {},
        });
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
    *deleteItem({ payload }, { call, put }) {
      const response = yield call(deleteItemById, payload);
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
    *get({ payload }, { call, put }) {
      const response = yield call(queryByCodeType, payload);
      yield put({
        type: 'getSave',
        payload: response,
      });
    },
  },
  reducers: {
    fetchSave(state, action) {
      return {
        ...state,
        data: {
          list: action.payload.data
        },
      };
    },
    getSave(state, action) {
      return {
        ...state,
        dict: action.payload.data || {},
      };
    },
  },
};
