const RouterConfig = require('../../config/config').default.routes;

const BASE_URL = `http://localhost:${process.env.PORT || 8000}`;

function formatter(routes, parentPath = '') {
  const fixedParentPath = parentPath.replace(/\/{1,}/g, '/');
  let result = [];
  routes.forEach((item) => {
    if (item.path && !item.redirect && !item.routes) {
      if (item.path.startsWith('/')) {
        result.push(item.path);
      } else {
        result.push(`${fixedParentPath}/${item.path}`.replace(/\/{1,}/g, '/'));
      }
    }
    if (item.routes) {
      result = result.concat(
        formatter(item.routes, item.path ? `${fixedParentPath}/${item.path}` : parentPath),
      );
    }
  });
  return Array.from(new Set(result.filter((item) => !!item)));
}

beforeEach(async () => {
  await page.goto(`${BASE_URL}`);
  await page.evaluate(() => {
    localStorage.setItem('antd-pro-authority', '["admin"]');
  });
});

describe('Ant Design Pro E2E test', () => {
  const testPage = (path) => async () => {
    await page.goto(`${BASE_URL}${path}`);
    await page.waitForSelector('footer', {
      timeout: 2000,
    });
    const haveFooter = await page.evaluate(
      () => document.getElementsByTagName('footer').length > 0,
    );
    expect(haveFooter).toBeTruthy();
  };

  const routers = formatter(RouterConfig);
  routers.forEach((route) => {
    it(`test pages ${route}`, testPage(route));
  });

  it('topmenu should have footer', async () => {
    const params = '?navTheme=light&layout=topmenu';
    await page.goto(`${BASE_URL}${params}`);
    await page.waitForSelector('footer', {
      timeout: 2000,
    });
    const haveFooter = await page.evaluate(
      () => document.getElementsByTagName('footer').length > 0,
    );
    expect(haveFooter).toBeTruthy();
  });
});
