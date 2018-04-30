export default {
  namespace: 'setting',

  state: {
    collapse: false,
    silderTheme: 'dark',
    themeColor: '#1890FF',
    layout: 'sidemenu',
    grid: 'Fluid',
    fixedHeader: false,
    autoHideHeader: false,
    fixSiderbar: false,
    colorWeak: 'close',
  },
  reducers: {
    changeSetting(state, { payload }) {
      const urlParams = new URL(window.location.href);
      Object.keys(payload).forEach(key => {
        if (key === 'collapse') {
          return;
        }
        let value = payload[key];
        if (value === true) {
          value = 1;
        }
        urlParams.searchParams.set(key, value);
      });
      window.history.replaceState(null, 'setting', urlParams.href);
      return {
        ...state,
        ...payload,
      };
    },
  },
};
