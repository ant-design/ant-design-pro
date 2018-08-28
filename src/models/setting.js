import { message } from 'antd';
import defaultSetting from '../defaultSetting';

let lessNodesAppended;
const buildSettings = (themeColor, colorWeak) => {
  document.body.className = colorWeak ? 'colorWeak' : '';
  // Determine if the component is remounted
  if (!themeColor || themeColor === '#1890FF' || themeColor === window['antd_pro_less_color']) {
    return;
  }
  const hideMessage = message.loading('正在编译主题！', 0);
  if (!lessNodesAppended) {
    console.log('append less nodes');
    const lessStyleNode = document.createElement('link');
    const lessConfigNode = document.createElement('script');
    const lessScriptNode = document.createElement('script');
    lessStyleNode.setAttribute('rel', 'stylesheet/less');
    lessStyleNode.setAttribute('href', '/color.less');
    lessConfigNode.innerHTML = `
      window.less = {
        async: true,
        env: 'production',
        javascriptEnabled: true
      };
    `;
    lessScriptNode.src = 'https://gw.alipayobjects.com/os/lib/less.js/3.8.1/less.min.js';
    lessScriptNode.async = true;
    lessScriptNode.onload = () => {
      buildIt();
      lessScriptNode.onload = null;
    };
    document.head.appendChild(lessStyleNode);
    document.head.appendChild(lessConfigNode);
    document.head.appendChild(lessScriptNode);
    lessNodesAppended = true;
  } else {
    buildIt();
  }
  function buildIt() {
    if (!window.less) {
      return;
    }
    window.less
      .modifyVars({
        '@primary-color': themeColor,
        '@input-hover-border-color': themeColor,
      })
      .then(() => {
        console.log('start to compile');
        window['antd_pro_less_color'] = themeColor;
        hideMessage();
      })
      .catch(() => {
        message.error(`Failed to update theme`);
        hideMessage();
      });
  }
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
      const { themeColor, colorWeak } = setting;
      buildSettings(themeColor, colorWeak);
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
      const { themeColor, colorWeak } = payload;
      buildSettings(themeColor, colorWeak);
      window.history.replaceState(null, 'setting', urlParams.href);
      return {
        ...state,
        ...payload,
      };
    },
  },
};
