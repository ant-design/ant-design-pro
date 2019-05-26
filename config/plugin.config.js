// Change theme plugin

import MergeLessPlugin from 'antd-pro-merge-less';
// import AntDesignThemePlugin from 'antd-theme-webpack-plugin';
import ThemeColorReplacer from 'webpack-theme-color-replacer';
import path from 'path';
import generate from '@ant-design/colors/lib/generate';

function getModulePackageName(module) {
  if (!module.context) return null;

  const nodeModulesPath = path.join(__dirname, '../node_modules/');
  if (module.context.substring(0, nodeModulesPath.length) !== nodeModulesPath) {
    return null;
  }

  const moduleRelativePath = module.context.substring(nodeModulesPath.length);
  const [moduleDirName] = moduleRelativePath.split(path.sep);
  let packageName = moduleDirName;
  // handle tree shaking
  if (packageName.match('^_')) {
    // eslint-disable-next-line prefer-destructuring
    packageName = packageName.match(/^_(@?[^@]+)/)[1];
  }
  return packageName;
}

export default config => {
  // preview.pro.ant.design only do not use in your production ; preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。
  if (
    process.env.ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site' ||
    process.env.NODE_ENV !== 'production'
  ) {
    // 将所有 less 合并为一个供 themePlugin使用
    const outFile = path.join(__dirname, '../.temp/ant-design-pro.less');
    const stylesDir = path.join(__dirname, '../src/');

    config.plugin('merge-less').use(MergeLessPlugin, [
      {
        stylesDir,
        outFile,
      },
    ]);
    config.plugin('webpack-theme-color-replacer').use(ThemeColorReplacer, [{
      fileName: 'css/theme-colors.css',
      matchColors: generate('#1890ff'), // 主色系列
    }]);
    // config.plugin('ant-design-theme').use(AntDesignThemePlugin, [
    //   {
    //     antDir: path.join(__dirname, '../node_modules/antd'),
    //     stylesDir,
    //     varFile: path.join(__dirname, '../node_modules/antd/lib/style/themes/default.less'),
    //     mainLessFile: outFile, //     themeVariables: ['@primary-color'],
    //     indexFileName: 'index.html',
    //     generateOne: true,
    //     lessUrl: 'https://gw.alipayobjects.com/os/lib/less.js/3.8.1/less.min.js',
    //   },
    // ]);
  }
  // optimize chunks
  config.optimization
    .runtimeChunk(false) // share the same chunks across different modules
    .splitChunks({
      chunks: 'async',
      name: 'vendors',
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        vendors: {
          test: module => {
            const packageName = getModulePackageName(module);
            if (packageName) {
              return ['bizcharts', '@antv_data-set'].indexOf(packageName) >= 0;
            }
            return false;
          },
          name(module) {
            const packageName = getModulePackageName(module);

            if (['bizcharts', '@antv_data-set'].indexOf(packageName) >= 0) {
              return 'viz'; // visualization package
            }
            return 'misc';
          },
        },
      },
    });
};
