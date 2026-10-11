import { expect, type FullConfig, request } from '@playwright/test';

export default async function globalSetup(config: FullConfig) {
  const context = await request.newContext({
    baseURL: config.projects[0].use.baseURL,
    timeout: 5_000,
  });

  try {
    // Playwright accepts HTTP 400 as ready, but Umi returns it while compiling.
    // Require HTTP 200 from the status probe before starting tests.
    await expect
      .poll(async () => (await context.get('/__umi/api/status')).status(), {
        timeout: 120_000,
        message: 'Wait for Umi compilation to finish',
      })
      .toBe(200);
  } finally {
    await context.dispose();
  }
}
