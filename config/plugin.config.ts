// Change theme plugin
// eslint-disable-next-line eslint-comments/abdeils - enable - pair;
/* eslint-disable import/no-extraneous-dependencies */
import ThemeColorReplacer from 'webpack-theme-color-replacer';
import generate from '@ant-design/colors/lib/generate';
import path from 'path';

interface SelectorUtil {
  changeEach(selector: string, surfix: string, prefix?: string): string;
}

function getModulePackageName(module: { context: string }) {
  if (!module.context) return null;

  const nodeModulesPath = path.join(__dirname, '../node_modules/');
  if (module.context.substring(0, nodeModulesPath.length) !== nodeModulesPath) {
    return null;
  }

  const moduleRelativePath = module.context.substring(nodeModulesPath.length);
  const [moduleDirName] = moduleRelativePath.split(path.sep);
  let packageName: string | null = moduleDirName;
  // handle tree shaking
  if (packageName && packageName.match('^_')) {
    // eslint-disable-next-line prefer-destructuring
    packageName = packageName.match(/^_(@?[^@]+)/)![1];
  }
  return packageName;
}

export default (config: any) => {
  // preview.pro.ant.design only do not use in your production;
  if (
    process.env.ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site' ||
    process.env.NODE_ENV !== 'production'
  ) {
    config.plugin('webpack-theme-color-replacer').use(ThemeColorReplacer, [
      {
        fileName: 'css/theme-colors-[contenthash:8].css',
        matchColors: getAntdSerials('#1890ff'), // 主色系列
        // 改变样式选择器，解决样式覆盖问题(最好能通过修改antd解决)
        changeSelector(selector: string, util: SelectorUtil): string {
          switch (selector) {
            case '.ant-calendar-today .ant-calendar-date':
              return ':not(.ant-calendar-selected-date):not(.ant-calendar-selected-day)' + selector;
            case '.ant-btn:focus,.ant-btn:hover':
              return util.changeEach(selector, ':not(.ant-btn-primary):not(.ant-btn-danger)');
            case '.ant-btn.active,.ant-btn:active':
              return util.changeEach(selector, ':not(.ant-btn-primary):not(.ant-btn-danger)');
            case '.ant-steps-item-process .ant-steps-item-icon>.ant-steps-icon':
              return ':not(.ant-steps-item-process)' + selector;
            case '.ant-menu-horizontal>.ant-menu-item-active,.ant-menu-horizontal>.ant-menu-item-open,' +
              '.ant-menu-horizontal>.ant-menu-item-selected,.ant-menu-horizontal>.ant-menu-item:hover,' +
              '.ant-menu-horizontal>.ant-menu-submenu-active,.ant-menu-horizontal>.ant-menu-submenu-open,' +
              '.ant-menu-horizontal>.ant-menu-submenu-selected,.ant-menu-horizontal>.ant-menu-submenu:hover':
              return (
                '.ant-menu-horizontal>.ant-menu-item-active,' +
                '.ant-menu-horizontal>.ant-menu-item-open,' +
                '.ant-menu-horizontal>.ant-menu-item-selected,' +
                '.ant-menu-horizontal:not(.ant-menu-dark)>.ant-menu-item:hover,' +
                '.ant-menu-horizontal>.ant-menu-submenu-active,' +
                '.ant-menu-horizontal>.ant-menu-submenu-open,' +
                '.ant-menu-horizontal:not(.ant-menu-dark)>.ant-menu-submenu-selected,' +
                '.ant-menu-horizontal:not(.ant-menu-dark)>.ant-menu-submenu:hover'
              );
            case '.ant-menu-horizontal>.ant-menu-item-selected>a':
              return '.ant-menu-horizontal:not(ant-menu-light):not(.ant-menu-dark)>.ant-menu-item-selected>a';
            case '.ant-menu-horizontal>.ant-menu-item>a:hover':
              return '.ant-menu-horizontal:not(ant-menu-light):not(.ant-menu-dark)>.ant-menu-item>a:hover';
            default:
              return selector;
          }
        },
        // isJsUgly: true,
      },
    ]);
  }

  // optimize chunks
  config.optimization
    // share the same chunks across different modules
    .runtimeChunk(false)
    .splitChunks({
      chunks: 'async',
      name: 'vendors',
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        vendors: {
          test: (module: { context: string }) => {
            const packageName = getModulePackageName(module) || '';
            if (packageName) {
              return [
                'bizcharts',
                'gg-editor',
                'g6',
                '@antv',
                'gg-editor-core',
                'bizcharts-plugin-slider',
              ].includes(packageName);
            }
            return false;
          },
          name(module: { context: string }) {
            const packageName = getModulePackageName(module);
            if (packageName) {
              if (['bizcharts', '@antv_data-set'].indexOf(packageName) >= 0) {
                return 'viz'; // visualization package
              }
            }
            return 'misc';
          },
        },
      },
    });
};

const getAntdSerials = (color: string) => {
  const lightNum = 9;
  const devide10 = 10;
  // 淡化（即less的tint）
  const lightens = new Array(lightNum).fill(undefined).map((_, i: number) => {
    return ThemeColorReplacer.varyColor.lighten(color, i / devide10);
  });
  const colorPalettes = generate(color);
  const rgb = ThemeColorReplacer.varyColor.toNum3(color.replace('#', '')).join(',');
  return lightens.concat(colorPalettes).concat(rgb);
};
