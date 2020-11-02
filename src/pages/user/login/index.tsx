import { AlipayCircleOutlined, TaobaoCircleOutlined, WeiboCircleOutlined } from '@ant-design/icons';
import { Alert, Checkbox } from 'antd';
import React, { useState } from 'react';
import { Link, connect, Dispatch, useIntl, FormattedMessage } from 'umi';
import { StateType } from '@/models/login';
import { LoginParamsType } from '@/services/login';
import { ConnectState } from '@/models/connect';
import LoginForm from './components/Login';

import styles from './style.less';

const { Tab, UserName, Password, Mobile, Captcha, Submit } = LoginForm;
interface LoginProps {
  dispatch: Dispatch;
  userLogin: StateType;
  submitting?: boolean;
}

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

const Login: React.FC<LoginProps> = (props) => {
  const { userLogin = {}, submitting } = props;
  const { status, type: loginType } = userLogin;
  const [autoLogin, setAutoLogin] = useState(true);
  const [type, setType] = useState<string>('account');
  const intl = useIntl();

  const handleSubmit = (values: LoginParamsType) => {
    const { dispatch } = props;
    dispatch({
      type: 'login/login',
      payload: { ...values, type },
    });
  };
  return (
    <div className={styles.main}>
      <LoginForm activeKey={type} onTabChange={setType} onSubmit={handleSubmit}>
        <Tab
          key="account"
          tab={intl.formatMessage({
            id: 'pages.login.accountLogin.tab',
            defaultMessage: '账户密码登录',
          })}
        >
          {status === 'error' && loginType === 'account' && !submitting && (
            <LoginMessage
              content={intl.formatMessage({
                id: 'pages.login.accountLogin.errorMessage',
                defaultMessage: '账户或密码错误（admin/ant.design)',
              })}
            />
          )}

          <UserName
            name="userName"
            placeholder={intl.formatMessage({
              id: 'pages.login.username.placeholder',
              defaultMessage: '用户名: admin or user',
            })}
            rules={[
              {
                required: true,
                message: (
                  <FormattedMessage
                    id="pages.login.username.required"
                    defaultMessage="请输入用户名!"
                  />
                ),
              },
            ]}
          />
          <Password
            name="password"
            placeholder={intl.formatMessage({
              id: 'pages.login.password.placeholder',
              defaultMessage: '密码: ant.design',
            })}
            rules={[
              {
                required: true,
                message: (
                  <FormattedMessage
                    id="pages.login.password.required"
                    defaultMessage="请输入密码！"
                  />
                ),
              },
            ]}
          />
        </Tab>
        <Tab
          key="mobile"
          tab={intl.formatMessage({
            id: 'pages.login.phoneLogin.tab',
            defaultMessage: '手机号登录',
          })}
        >
          {status === 'error' && loginType === 'mobile' && !submitting && (
            <LoginMessage
              content={intl.formatMessage({
                id: 'pages.login.phoneLogin.errorMessage',
                defaultMessage: '验证码错误',
              })}
            />
          )}
          <Mobile
            name="mobile"
            placeholder={intl.formatMessage({
              id: 'pages.login.phoneNumber.placeholder',
              defaultMessage: '手机号',
            })}
            rules={[
              {
                required: true,
                message: (
                  <FormattedMessage
                    id="pages.login.phoneNumber.required"
                    defaultMessage="请输入手机号！"
                  />
                ),
              },
              {
                pattern: /^1\d{10}$/,
                message: (
                  <FormattedMessage
                    id="pages.login.phoneNumber.invalid"
                    defaultMessage="手机号格式错误！"
                  />
                ),
              },
            ]}
          />
          <Captcha
            name="captcha"
            placeholder={intl.formatMessage({
              id: 'pages.login.captcha.placeholder',
              defaultMessage: '验证码',
            })}
            countDown={120}
            getCaptchaButtonText=""
            getCaptchaSecondText={intl.formatMessage({
              id: 'pages.getCaptchaSecondText',
              defaultMessage: '秒',
            })}
            rules={[
              {
                required: true,
                message: (
                  <FormattedMessage
                    id="pages.login.captcha.required"
                    defaultMessage="请输入验证码！"
                  />
                ),
              },
            ]}
          />
        </Tab>
        <div>
          <Checkbox checked={autoLogin} onChange={(e) => setAutoLogin(e.target.checked)}>
            <FormattedMessage id="pages.login.rememberMe" defaultMessage="自动登录" />
          </Checkbox>
          <a
            style={{
              float: 'right',
            }}
          >
            <FormattedMessage id="pages.login.forgotPassword" defaultMessage="忘记密码" />
          </a>
        </div>
        <Submit loading={submitting}>
          <FormattedMessage id="pages.login.submit" defaultMessage="登录" />
        </Submit>
        <div className={styles.other}>
          <FormattedMessage id="pages.login.loginWith" defaultMessage="其他登录方式" />
          <AlipayCircleOutlined className={styles.icon} />
          <TaobaoCircleOutlined className={styles.icon} />
          <WeiboCircleOutlined className={styles.icon} />
          <Link className={styles.register} to="/user/register">
            <FormattedMessage id="pages.login.registerAccount" defaultMessage="注册账户" />
          </Link>
        </div>
      </LoginForm>
    </div>
  );
};

export default connect(({ login, loading }: ConnectState) => ({
  userLogin: login,
  submitting: loading.effects['login/login'],
}))(Login);
