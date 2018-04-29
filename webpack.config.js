import AntDesignThemePlugin from 'antd-theme-webpack-plugin';

const path = require('path');

export default webpackConfig => {
  const options = {
    antDir: path.join(__dirname, './node_modules/antd'),
    stylesDir: path.join(__dirname, './src'),
    varFile: path.join(__dirname, './node_modules/antd/lib/style/themes/default.less'),
    mainLessFile: path.join(__dirname, './src/index.less'),
    themeVariables: ['@primary-color'],
    indexFileName: 'index.html',
  };

  const themePlugin = new AntDesignThemePlugin(options);
  // in config object
  webpackConfig.plugins.push(themePlugin);
  return webpackConfig;
};
