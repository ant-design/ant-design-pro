import { createRequire } from 'node:module';
import { configUmiAlias, createConfig } from '@umijs/max/test.js';

const require = createRequire(import.meta.url);

export default async (): Promise<any> => {
  const config = await configUmiAlias({
    ...createConfig({
      target: 'browser',
    }),
  });
  return {
    ...config,
    testPathIgnorePatterns: ['/node_modules/', '/.worktrees/'],
    moduleNameMapper: {
      '\\.md$': '<rootDir>/tests/__mocks__/raw.js',
      ...(config.moduleNameMapper || {}),
      '^mermaid$': '<rootDir>/tests/__mocks__/mermaid.js',
    },
    testEnvironmentOptions: {
      ...(config?.testEnvironmentOptions || {}),
      url: 'http://localhost:8000',
    },
    setupFiles: [...(config.setupFiles || []), './tests/setupTests.jsx'],
    globals: {
      ...config.globals,
      localStorage: null,
      __APP_VERSION__: 'test',
      __UMI_VERSION__: require('@umijs/max/package.json').version,
      __UTOO_VERSION__: require('@utoo/pack/package.json').version,
    },
  };
};
