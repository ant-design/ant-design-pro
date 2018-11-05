import puppeteer from 'puppeteer';

const BASE_URL = `http://localhost:${process.env.PORT || 8000}`;

describe('Homepage', () => {
  beforeAll(async () => {
    jest.setTimeout(1000000);
  });
  it('it should have logo text', async () => {
    const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
    const page = await browser.newPage();
    await page.goto(BASE_URL, { waitUntil: 'networkidle2' });
    const text = await page.evaluate(() => document.getElementsByTagName('h1')[0].innerText);
    expect(text).toContain('Ant Design Pro');

    await page.close();
    browser.close();
  });
});
