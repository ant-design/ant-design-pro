---
order: 0
title:
  zh-CN: 标准登录
  en-US: Standard Login
---

Support login with account and mobile number.

````jsx
import Login from 'ant-design-pro/lib/Login';
import { Alert, Checkbox } from 'antd';

const { Tab, UserName, Password, Mobile, Captcha, Submit } = Login;

class LoginDemo extends React.Component {
  state = {
    notice: '',
    type: 'tab2',
    autoLogin: true,
  };
  onSubmit = (err, values) => {
    console.log('value collected ->', {
      ...values,
      autoLogin: this.state.autoLogin,
    });
    if (this.state.type === 'tab1') {
      this.setState(
        {
          notice: '',
        },
        () => {
          if (
            !err &&
            (values.username !== 'admin' || values.password !== '888888')
          ) {
            setTimeout(() => {
              this.setState({
                notice:
                  'The combination of username and password is incorrect!',
              });
            }, 500);
          }
        },
      );
    }
  };
  onTabChange = (key) => {
    this.setState({
      type: key,
    });
  };
  changeAutoLogin = (e) => {
    this.setState({
      autoLogin: e.target.checked,
    });
  };
  render() {
    return (
      <div className="login-warp">
        <Login
          defaultActiveKey={this.state.type}
          onTabChange={this.onTabChange}
          onSubmit={this.onSubmit}
        >
          <Tab key="tab1" tab="Account">
            {this.state.notice && (
              <Alert
                style={{ marginBottom: 24 }}
                message={this.state.notice}
                type="error"
                showIcon
                closable
              />
            )}
            <UserName name="username" />
            <Password name="password" />
          </Tab>
          <Tab key="tab2" tab="Mobile">
            <Mobile name="mobile" />
            <Captcha
              onGetCaptcha={() => console.log('Get captcha!')}
              name="captcha"
            />
          </Tab>
          <div>
            <Checkbox
              checked={this.state.autoLogin}
              onChange={this.changeAutoLogin}
            >
              Keep me logged in
            </Checkbox>
            <a style={{ float: 'right' }} href="">
              Forgot password
            </a>
          </div>
          <Submit>Login</Submit>
          <div>
            Other login methods
            <span className="icon icon-alipay" />
            <span className="icon icon-taobao" />
            <span className="icon icon-weibo" />
            <a style={{ float: 'right' }} href="">
              Register
            </a>
          </div>
        </Login>
      </div>
    );
  }
}

ReactDOM.render(<LoginDemo />, mountNode);
````

<style>
#scaffold-src-components-Login-demo-basic .login-warp{
  max-width: 360px;
  margin: auto;
}
#scaffold-src-components-Login-demo-basic .icon {
  display: inline-block;
  width: 24px;
  height: 24px;
  background: url('https://gw.alipayobjects.com/zos/rmsportal/itDzjUnkelhQNsycranf.svg');
  margin-left: 16px;
  vertical-align: middle;
  cursor: pointer;
}
#scaffold-src-components-Login-demo-basic .icon-alipay {
  background-position: -24px 0;
}
#scaffold-src-components-Login-demo-basic .icon-alipay:hover {
  background-position: 0 0;
}
#scaffold-src-components-Login-demo-basic .icon-taobao {
  background-position: -24px -24px;
}
#scaffold-src-components-Login-demo-basic .icon-taobao:hover {
  background-position: 0 -24px;
}
#scaffold-src-components-Login-demo-basic .icon-weibo {
  background-position: -24px -48px;
}
#scaffold-src-components-Login-demo-basic .icon-weibo:hover {
  background-position: 0 -48px;
}
</style>
