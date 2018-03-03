import Nightmare from 'nightmare';

describe('Login', () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 300000; // 5 minute timeout
  let page;
  beforeEach(() => {
    page = Nightmare();
    page
      .goto('http://localhost:8000/')
      .evaluate(() => {
        window.localStorage.setItem('antd-pro-authority', 'guest');
      })
      .goto('http://localhost:8000/#/user/login');
  });

  it('should login with failure', async (done) => {
    await page.type('#userName', 'mockuser')
      .type('#password', 'wrong_password')
      .click('button[type="submit"]')
      .wait('.ant-alert-error') // should display error
      .end();
    done();
  });

  it('should login successfully', async (done) => {
    const text = await page.type('#userName', 'admin')
      .type('#password', '888888')
      .click('button[type="submit"]')
      .wait('.ant-layout-sider h1') // should display error
      .evaluate(() => document.body.innerHTML)
      .end();
    expect(text).toContain('<h1>Ant Design Pro</h1>');
    done();
  });
});
