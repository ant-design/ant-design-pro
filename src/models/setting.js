export default {
  namespace: 'setting',

  state: {
    collapse: false,
    silderTheme: 'dark',
    themeColor: '#1890ff',
    layout: 'left',
    grid: 'Wide',
    fixedHeader: false,
    autoHideHeader: false,
    fixSiderbar: false,
    colorWeak: false,
  },
  reducers: {
    changeSetting(state, { payload }) {
      const urlParams = new URL(window.location.href);
      let urlParamsString = '';
      Object.keys(payload).forEach((key) => {
        if (payload[key] && state[key] !== undefined && key !== 'collapse') {
          urlParamsString += `${key}:${payload[key]};`;
        }
      });
      urlParams.searchParams.set('setting', urlParamsString);
      window.history.replaceState(null, 'setting', urlParams.href);
      return {
        ...state,
        ...payload,
      };
    },
  },
};
