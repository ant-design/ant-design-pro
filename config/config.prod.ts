import { IConfig } from 'umi-types';

export default {
  extraBabelPlugins: [['transform-remove-console', { exclude: ['error'] }]],
} as IConfig;
