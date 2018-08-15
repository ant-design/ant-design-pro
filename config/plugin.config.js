// Change theme plugin

const MergeLessPlugin = require('antd-pro-merge-less');
const AntDesignThemePlugin = require('antd-theme-webpack-plugin');
const path = require('path');

const plugin = config => {
  // 将所有 less 合并为一个供 themePlugin使用
  const outFile = path.join(__dirname, '../.temp/ant-design-pro.less');
  const stylesDir = path.join(__dirname, '../src/');

  config.plugin('merge-less').use(MergeLessPlugin, [
    {
      stylesDir,
      outFile,
    },
  ]);

  config.plugin('ant-design-theme').use(AntDesignThemePlugin, [
    {
      antDir: path.join(__dirname, '../node_modules/antd'),
      stylesDir,
      varFile: path.join(__dirname, '../node_modules/antd/lib/style/themes/default.less'),
      mainLessFile: outFile,
      themeVariables: ['@primary-color'],
      indexFileName: 'index.html',
    },
  ]);
};

module.exports = plugin;
