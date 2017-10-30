export default {
  namespace: 'logout',

  state: {
    status: undefined,
  },

  effects: {
    * logoutSubmit({ payload }, { put }) {
      yield put({
        type: 'logout',
        payload,
      });
    },
  },

  reducers: {
    logout(state, { payload }) {
      return {
        ...state,
        status: payload.status,
      };
    },
  },
};
