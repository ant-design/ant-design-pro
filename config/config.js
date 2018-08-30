import routerConfig from './router.config';

export default {
  plugins: [
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: {
          hmr: true,
        },
      },
    ],
  ],
  externals: {
    '@antv/data-set': 'DataSet',
    rollbar: 'rollbar',
  },
  ignoreMomentLocale: true,
  theme: {
    // 'primary-color': '#10e99b',
    'card-actions-background': '#f5f8fa',
  },
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  disableDynamicImport: true,
  publicPath: '/',
  hash: true,
  routes: routerConfig,
};
