export default {
  namespace: 'setting',

  state: {
    collapse: false,
    silderTheme: 'dark',
    themeColor: '#1890ff',
    layout: 'left',
    grid: 'Wide',
    fixedHeader: false,
    autoHideoHeader: false,
    fixSiderbar: true,
    colorWeak: false,
  },
  reducers: {
    changeSetting(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
