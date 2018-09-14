import { query, remove, add, update } from '@/services/api';

export default {
  namespace: 'wall',

  state: {
    data: {
      list: [],
      pagination: {
        current: 1,
        pageSize: 20,
      },
    }
  },

  effects: {
    *fetchKV({ payload }, { call, put }) {
      const response = yield call(query, payload);
      yield put({
        type: 'saveKV',
        payload: response,
      });
    },
    *fetch({ payload }, { call, put }) {
      const response = yield call(query, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchMore({ payload }, { call, put }) {
      const response = yield call(query, payload);
      yield put({
        type: 'saveMore',
        payload: response,
      });
    },
    *addUpload({ payload }, { put }) {
      yield put({
        type: 'saveAdd',
        payload,
      });
    },
    *add({ payload, callback }, { call, put }) {
      const response = yield call(add, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(remove, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *update({ payload, callback }, { call, put }) {
      const response = yield call(update, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *return({ payload, callback }, { call, put }) {
      const response = yield call(update, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *clean({ callback }, { put }) {
      yield put({
        type: 'clean',
      });
      if (callback) callback();
    },
  },

  reducers: {
    saveMore(state, action) {
      return {
        data: {
          list: [...state.data.list,...action.payload.list],
          pagination: action.payload.pagination,
        },
      };
    },
    saveAdd(state, action) {
      return {
        data: {
          list:[...action.payload],
          pagination: state.data.pagination,
        }
      };
    },
    save(state, action) {
      if(action.payload.list){
        return {
          ...state,
          data: action.payload,
        };
      } 
      return {
        ...state,
        ...action.payload,
      };
    },
    saveKV(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
    clean(){
      return {
        data: {
          list: [],
          pagination: {},
        },
      }
    },
  },
};
