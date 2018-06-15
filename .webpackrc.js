const path = require('path');

export default {
  entry: 'src/index.js',
  extraBabelPlugins: [
    [
      'import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
      },
    ],
  ],
  env: {
    development: {
      extraBabelPlugins: ['dva-hmr'],
    },
  },
  alias: {
    components: path.resolve(__dirname, 'src/components/'),
  },
  ignoreMomentLocale: true,
  theme: './src/theme.js',
  html: {
    template: './src/index.ejs',
  },
  publicPath: '/',
  disableDynamicImport: true,
  hash: true,
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  cssLoaderOptions: {
    modules: true,
    getLocalIdent: (context, localIdentName, localName) => {
      if (context.resourcePath.includes('node_modules')) {
        return localName;
      }

      let antdProPath = context.resourcePath.match(/src(.*)/)[1];
      if (context.resourcePath.includes('components')) {
        antdProPath = antdProPath.replace('components/', '');
      }
      const arr = antdProPath
        .split('/')
        .map(a => a.replace(/([A-Z])/g, '-$1'))
        .map(a => a.toLowerCase());
      arr.pop();
      return `antd-pro${arr.join('-')}-${localName}`.replace('--', '-');
    },
  },
};
