const defaultSetting = {
  collapse: false,
  silderTheme: 'dark',
  themeColor: '#1890FF',
  layout: 'sidemenu',
  grid: 'Fluid',
  fixedHeader: false,
  autoHideHeader: false,
  fixSiderbar: false,
  colorWeak: 'close',
};

const localSetting = window.localStorage.getItem('antd-pro-setting');
if (localSetting) {
  try {
    const parsedSetting = JSON.parse(localSetting);
    Object.keys(parsedSetting).forEach(key => {
      if (defaultSetting.hasProperty(key)) {
        defaultSetting[key] = parsedSetting[key];
      }
    });
  } catch (error) {
    if (error.name === 'SyntaxError') {
      window.localStorage.removeItem('antd-pro-setting');
    } else {
      throw error;
    }
  }
}

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
      window.localStorage.setItem('antd-pro-setting', JSON.stringify(payload));
      return {
        ...state,
        ...payload,
      };
    },
  },
};
