import visit from './helpers/visit';

describe('Login', () => {
  it('should login with failure', async () => {
    const page = visit('/#/user/login');
    await page.type('#userName', 'mockuser')
      .type('#password', 'wrong_password')
      .click('button[type="submit"]')
      .wait('.ant-alert-error')  // should display error
      .end();
  });

  it('should login successfully', async () => {
    const page = visit('/#/user/login');
    const text = await page.type('#userName', 'admin')
      .type('#password', '888888')
      .click('button[type="submit"]')
      .wait('.ant-layout-sider h1')  // should display error
      .evaluate(() => document.body.innerHTML)
      .end();
    expect(text).toContain('<h1>Ant Design Pro</h1>');
  });
});
