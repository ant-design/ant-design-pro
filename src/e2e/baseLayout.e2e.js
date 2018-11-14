import RouterConfig from '../../config/router.config';

const BASE_URL = `http://localhost:${process.env.PORT || 8000}`;

function formatter(data) {
  return data
    .reduce((pre, item) => {
      pre.push(item.path);
      return pre;
    }, [])
    .filter(item => item);
}

describe('Homepage', async () => {
  const testPage = path =>
    new Promise(async reslove => {
      console.log(`test ${path}`);
      await page.goto(`${BASE_URL}${path}`, {
        timeout: 600000,
      });
      await page.waitForSelector('footer', {
        timeout: 600000,
      });
      reslove();
    });

  beforeAll(async () => {
    jest.setTimeout(1000000);
    await page.setCacheEnabled(false);
  });

  it(`test pages`, async () => {
    const routers = formatter(RouterConfig[1].routes);
    const testAll = index =>
      new Promise(async reslove => {
        await testPage(routers[index]);
        if (index < routers.length - 1) {
          const newIndex = index + 1;
          await testAll(newIndex);
          reslove();
        }
        reslove();
      });
    await testAll(0);
  });
});
