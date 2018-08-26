export const model = {
  state: {
    data: [],
    loading: true,
  },
  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    saveData(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
};

export const pageModel = {
  state: {
    loading: true,
    list: [],
    pagination: {
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: total => `共 ${total} 条`,
      current: 1,
      total: 0,
    },
  },
  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    saveData(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
};
