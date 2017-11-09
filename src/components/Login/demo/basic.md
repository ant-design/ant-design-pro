---
order: 0
title: 标准登录框
---

支持账号密码及手机号登录两种模式。

````jsx
import Login from 'ant-design-pro/lib/Login';
import { Icon, Checkbox, Alert } from 'antd';

const data = [{
  loginType: '账户密码登录',
  key: 'account',
  inputControls: [{
    key: 'userName',
    type: 'userName',
  }, {
    key: 'password',
    type: 'password',
  }],
}, {
  loginType: '手机号登录',
  key: 'mobile',
  inputControls: [{
    key: 'mobile',
    type: 'mobile',
  }, {
    key: 'captcha',
    type: 'captcha',
  }],
}]

const extra = (
  <div>
    <Checkbox>自动登录</Checkbox>
    <a style={{ float: 'right' }} href="">忘记密码</a>
  </div>
);

const moreLoginTypes = {
  types: (
    <span>
      <span className="icon icon-alipay" />
      <span className="icon icon-taobao" />
      <span className="icon icon-weibo" />
    </span>
  ),
};

class LoginDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notice: {},
      key: 'account',
    };
  }
  onSubmit = (err, values) => {
    console.log(err, values);
    if (!err) {
      this.setState({
        notice: {},
      }, () => {
        setTimeout(() => {
          if (this.state.key === 'account' && (values.userName !== 'admin' || values.password !== '888888')) {
            const { notice } = this.state;
            notice.message = '账号或密码错误！';
            notice.type = 'error';
            notice.closable = true;
            notice.showIcon = true;
            this.setState({
              notice,
            })
          }
        }, 500);
      })
    }
  }
  onTabChange = (key) => {
    this.setState({
      key,
      notice: {},
    });
  }
  render() {
    return (
      <div>
        <Login
          defaultActiveKey={this.state.key}
          data={data}
          extra={extra}
          moreLoginTypes={moreLoginTypes}
          register={{ href: '/' }}
          notice={this.state.notice}
          onTabChange={this.onTabChange}
          onSubmit={this.onSubmit}
          onGetCaptcha={() => {console.log('clicked!')}}
        />
      </div>
    )
  }
}

ReactDOM.render(<LoginDemo />, mountNode);
````

<style>
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
