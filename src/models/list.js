import { queryFakeList } from '../services/api';

export default {
  namespace: 'list',

  state: {
    list: [],
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryFakeList, payload);
      yield put({
        type: 'queryList',
        payload: Array.isArray(response) ? response : [],
      });
    },
    *appendFetch({ payload }, { call, put }) {
      const response = yield call(queryFakeList, { count: 5, ...payload }); // post
      yield put({
        type: 'appendList',
        payload: { list: response, updateItem: payload },
      });
    },
  },

  reducers: {
    queryList(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    appendList(state, { payload: { list: data, updateItem } }) {
      /** ** 模拟入库开始 ** */
      const list = data;
      if (updateItem.id) {
        list.some((item, i) => {
          if (item.id === updateItem.id) {
            if (Object.keys(updateItem).length === 1) { // delete
              list.splice(i, 1);
            } else {
              list[i] = { ...item, ...updateItem }; // edit
            }
            return true;
          }
          return false;
        });
      } else {
        list.unshift({ id: 'fake-list-x', ...updateItem }); // add
      }
      /** ** 模拟入库结束 ** */
      return { ...state, list };
    },
  },
};
