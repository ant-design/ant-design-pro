import AntDesignThemePlugin from 'antd-theme-webpack-plugin';
import MergeLessPlugin from './scripts/mergeLessPlugin';

const path = require('path');

export default webpackConfig => {
  // 将所有 less 合并为一个供 themePlugin使用
  const outFile = path.join(__dirname, './temp/ant-design-pro.less');
  const stylesDir = path.join(__dirname, './src/');

  const mergeLessPlugin = new MergeLessPlugin({
    stylesDir,
    outFile,
  });

  const options = {
    antDir: path.join(__dirname, './node_modules/antd'),
    stylesDir,
    varFile: path.join(__dirname, './node_modules/antd/lib/style/themes/default.less'),
    mainLessFile: outFile,
    themeVariables: ['@primary-color'],
    indexFileName: 'index.html',
  };
  const themePlugin = new AntDesignThemePlugin(options);

  // in config object
  webpackConfig.plugins.push(mergeLessPlugin);
  webpackConfig.plugins.push(themePlugin);

  return webpackConfig;
};
