import Footer from '@/components/Footer';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginForm, ProFormText } from '@ant-design/pro-components';
import { Helmet, history } from '@umijs/max';
import classNames from 'classnames/bind';
import React from 'react';

import defaultSettings from '../../../../config/defaultSettings';

import { login } from '@/services/evil-pro-cli/login';
import { message } from 'antd';
import styles from './index.less';

const cx = classNames.bind(styles);

const Login: React.FC = () => {
  const handleSubmit = async (values: any) => {
    try {
      // 登录
      const res = await login(values);
      const { code, data } = res || {};
      if (code === 200) {
        message.success('登录成功');
        localStorage.setItem('EVIL_PRO_CLI_TOKEN', data?.authorization || '');
        setTimeout(() => {
          history.push('/');
          window.location.reload();
        }, 500);
        return;
      }
    } catch (error) {
      console.log('🚗 🚗 🚗 ~ file: index.tsx:47 ~ handleSubmit ~ error:', error);
    }
  };

  return (
    <div className={cx('container')}>
      <Helmet>
        <title>登录 - {defaultSettings.title}</title>
      </Helmet>
      <div className={cx('login-content')}>
        <div className={cx('login-bg')} />
        <div className={cx('login-form')}>
          <LoginForm
            contentStyle={{
              minWidth: 280,
              maxWidth: '75vw',
            }}
            logo={<img alt="logo" src="/images/logo_simple.png" />}
            title="Evil Pro Cli"
            onFinish={async (values) => {
              await handleSubmit(values as any);
            }}
          >
            <ProFormText
              name="username"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined />,
              }}
              placeholder="请输入用户名"
              rules={[
                {
                  required: true,
                  message: '请输入用户名!',
                },
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined />,
              }}
              placeholder="请输入密码"
              rules={[
                {
                  required: true,
                  message: '请输入密码！',
                },
              ]}
            />
            <div
              style={{
                marginBlockEnd: 24,
                overflow: 'hidden',
              }}
            >
              {/* <a
                style={{
                  float: 'right',
                }}
                onClick={() => {
                  setModalVisit(true);
                }}
              >
                忘记密码
              </a> */}
            </div>
          </LoginForm>
          <Footer />
        </div>
      </div>
      {/* <ForgetPasswordModal open={modalVisit} onOpenChange={setModalVisit} /> */}
    </div>
  );
};

export default Login;
