const defaultSetting = {
  collapse: false,
  silderTheme: 'dark',
  themeColor: '#1890FF',
  layout: 'sidemenu',
  grid: 'Fluid',
  fixedHeader: false,
  autoHideHeader: false,
  fixSiderbar: false,
  colorWeak: false,
};

export default {
  namespace: 'setting',
  state: defaultSetting,
  reducers: {
    getSetting(state) {
      const setting = {};
      const urlParams = new URL(window.location.href);
      Object.keys(state).forEach(key => {
        if (urlParams.searchParams.has(key)) {
          const value = urlParams.searchParams.get(key);
          setting[key] = value === '1' ? true : value;
        }
      });
      return {
        ...state,
        ...setting,
      };
    },
    changeSetting(state, { payload }) {
      const urlParams = new URL(window.location.href);
      Object.keys(defaultSetting).forEach(key => {
        if (urlParams.searchParams.has(key)) {
          urlParams.searchParams.delete(key);
        }
      });
      Object.keys(payload).forEach(key => {
        if (key === 'collapse') {
          return;
        }
        let value = payload[key];
        if (value === true) {
          value = 1;
        }
        if (defaultSetting[key] !== value) {
          urlParams.searchParams.set(key, value);
        }
      });
      window.history.replaceState(null, 'setting', urlParams.href);
      return {
        ...state,
        ...payload,
      };
    },
  },
};
