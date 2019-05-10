import { getStaticData } from '@/services/api';

export default {
  namespace: 'home',

  state: {
    data: {
      homeData: {
        user: {
          name: 'TEST',
          qq: '0',
        },
        userinfo: {
          score: 0,
          phone: 0,
          proxy: '一级代理',
        },
        barinfo: {
          barnum: 0,
          machine: 0,
        },
      },
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      console.log('Home/fetch -- payload: ', payload, '  call :', call, ' put: ', put);
      const response = yield call(getStaticData, payload);
      yield put({
        type: 'save',
        payload: response,
      });
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
