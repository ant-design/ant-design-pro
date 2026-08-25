import { join } from 'node:path';
import { playwright } from '@vitest/browser-playwright';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [
    {
      name: 'vitest-md-raw-loader',
      transform(code, id) {
        if (!id.endsWith('.md')) {
          return null;
        }
        return {
          code: `export default ${JSON.stringify(String(code))};`,
          map: null,
        };
      },
    },
  ],
  // 屏蔽 esbuild 噪声
  optimizeDeps: {
    noDiscovery: true,
    include: [],
  },
  resolve: {
    alias: {
      '@': join(__dirname, 'src'),
      '@root': join(__dirname),
      '@@': join(__dirname, 'src', '.umi'),
    },
  },
  test: {
    environment: 'happy-dom',
    browser: {
      enabled: true,
      headless: true,
      provider: playwright(),
      instances: [{ browser: 'chromium' }],
    },
    globals: true,
    setupFiles: ['./tests/setupTests.ts'],
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    // Exclude Umi integration tests that depend on @umijs/max test infrastructure
    // These require Umi's Jest runner and cannot be used with Vitest directly
    exclude: [
      'src/pages/user/login/login.test.tsx',
      'node_modules',
      'dist',
      '.umi',
    ],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/.umi/**',
        'src/services/ant-design-pro/**',
        'src/**/*.d.ts',
        'src/**/index.style.ts',
      ],
    },
    passWithNoTests: true,
    testTimeout: 15000,
  },
});
