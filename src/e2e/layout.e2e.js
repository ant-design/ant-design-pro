import puppeteer from 'puppeteer';
import RouterConfig from '../../config/router.config';

function formatter(data) {
  return data
    .reduce((pre, item) => {
      if (item.routes) {
        return pre.concat(formatter(item.routes));
      }
      pre.push(item.path);
      return pre;
    }, [])
    .filter(item => item);
}

describe('Homepage', () => {
  let browser;
  let page;

  const testAllPage = async layout =>
    new Promise(async (resolve, reject) => {
      const loadPage = async index => {
        const path = layout[index];
        try {
          await page.goto(`http://localhost:8000${path}`, { waitUntil: 'networkidle2' });
          const haveFooter = await page.evaluate(
            () => document.getElementsByTagName('footer').length > 0
          );

          expect(haveFooter).toBeTruthy();

          if (index < layout.length - 1) {
            loadPage(index + 1);
          } else {
            resolve('ok');
          }
        } catch (error) {
          reject(error);
        }
      };
      loadPage(0);
    });

  beforeAll(async () => {
    browser = await puppeteer.launch({ args: ['--no-sandbox'] });
    page = await browser.newPage();
    jest.setTimeout(1000000);
  });

  it('test user layout', async () => {
    const userLayout = formatter(RouterConfig[0].routes);
    await testAllPage(userLayout);
  });

  it('test base layout', async () => {
    const baseLayout = formatter(RouterConfig[1].routes);
    await testAllPage(baseLayout);
  });

  afterAll(() => browser.close());
});
