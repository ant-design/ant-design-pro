import Nightmare from 'nightmare';

describe('Homepage', () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 300000; // 5 minute timeout
  it('it should have logo text', async (done) => {
    const page = Nightmare().goto('http://localhost:8000');
    const text = await page.wait('h1').evaluate(() => document.body.innerHTML).end();
    expect(text).toContain('<h1>Ant Design Pro</h1>');
    done();
  });
});
