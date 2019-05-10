import { queryNetBar, removeNetBar, addNetBar, updateNetBar } from '@/services/api';

export default {
  namespace: 'netbar',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      console.log('Home/fetch -- payload: ', payload, '  call :', call, ' put: ', put);
      const response = yield call(queryNetBar, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *add({ payload, callback }, { call, put }) {
      console.log(
        'add -- payload: ',
        payload,
        '  call :',
        call,
        ' put: ',
        put,
        ' callback: ',
        callback
      );
      const response = yield call(addNetBar, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *remove({ payload, callback }, { call, put }) {
      console.log(
        'remove -- payload: ',
        payload,
        '  call :',
        call,
        ' put: ',
        put,
        ' callback: ',
        callback
      );
      const response = yield call(removeNetBar, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *update({ payload, callback }, { call, put }) {
      console.log(
        'update -- payload: ',
        payload,
        '  call :',
        call,
        ' put: ',
        put,
        ' callback: ',
        callback
      );
      const response = yield call(updateNetBar, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
  },

  reducers: {
    save(state, action) {
      console.log('save: ', '  state: ', state, '  action: ', action);
      return {
        ...state,
        data: action.payload,
      };
    },
  },
};
