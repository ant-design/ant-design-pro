const getBrowser = require('./getBrowser');

const BASE_URL = `http://localhost:${process.env.PORT || 8000}`;

let browser;
let page;

beforeAll(async () => {
  browser = await getBrowser();
});

beforeEach(async () => {
  page = await browser.newPage();
  await page.goto(`${BASE_URL}`);
  await page.evaluate(() => {
    localStorage.setItem('antd-pro-authority', '["admin"]');
  });
});

describe('Homepage', () => {
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

afterAll(() => {
  browser.close();
});
