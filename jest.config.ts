import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { configUmiAlias, createConfig } from '@umijs/max/test.js';

const readPkgVersion = (pkg: string) =>
  JSON.parse(readFileSync(join('node_modules', pkg, 'package.json'), 'utf-8'))
    .version;

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
      __UMI_VERSION__: readPkgVersion('@umijs/max'),
      __UTOO_VERSION__: readPkgVersion('@utoo/pack'),
    },
  };
};
