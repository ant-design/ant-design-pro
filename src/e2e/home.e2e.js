const BASE_URL = `http://localhost:${process.env.PORT || 8000}`;

describe('Homepage', () => {
  beforeAll(async () => {
    jest.setTimeout(1000000);
  });
  it('it should have logo text', async () => {
    await page.goto(BASE_URL);
    await page.waitForSelector('h1', {
      timeout: 2000,
    });
    const text = await page.evaluate(() => document.getElementsByTagName('h1')[0].innerText);
    expect(text).toContain('Ant Design Pro');
  });
});
