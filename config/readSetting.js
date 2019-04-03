import settings from './defaultSettings';

let defaultSettings = {
  menu: {
    locale: true,
  },
};

const Settings = () => {
  defaultSettings = {
    ...defaultSettings,
    ...settings,
  };
  return {
    get: key => (key ? defaultSettings[key] : defaultSettings),
    settings: defaultSettings,
  };
};
export default Settings();
