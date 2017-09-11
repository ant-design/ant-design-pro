import visit from './helpers/visit';

describe('Homepage', () => {
  it('it should have logo text', async () => {
    const page = visit('/');
    const text = await page.evaluate(() => document.body.innerHTML).end();
    expect(text).toContain('<h1>Ant Design Pro</h1>');
  });
});
