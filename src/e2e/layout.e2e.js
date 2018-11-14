import puppeteer from 'puppeteer';
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

describe('Homepage', () => {
  let browser;
  let page;

  const testPage = path => async () => {
    await page.goto(`${BASE_URL}${path}`, { waitUntil: 'networkidle2' });
    const haveFooter = await page.evaluate(
      () => document.getElementsByTagName('footer').length > 0
    );
    expect(haveFooter).toBeTruthy();
  };

  beforeAll(async () => {
    jest.setTimeout(1000000);
    browser = await puppeteer.launch({ args: ['--no-sandbox'] });
    page = await browser.newPage();
  });

  RouterConfig.forEach(({ routes = [] }) => {
    formatter(routes).forEach(route => {
      it(`test pages ${route}`, testPage(route));
    });
  });

  afterAll(() => browser.close());
});
