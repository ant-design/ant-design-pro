import puppeteer from 'puppeteer';

describe('Homepage', () => {
  it('it should have logo text', async () => {
    const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
    const page = await browser.newPage();
    await page.goto('http://localhost:8000', { waitUntil: 'networkidle2' });
    await page.waitForSelector('h1');
    const text = await page.evaluate(() => document.body.innerHTML);
    expect(text).toContain('<h1>Ant Design Pro</h1>');
    await page.close();
    browser.close();
  });
});
