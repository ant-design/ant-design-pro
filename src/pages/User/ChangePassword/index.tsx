import { passwordReg } from '@/utils/validator';
import { Form, Input } from 'antd';
import React from 'react';

const ChangePassword = React.forwardRef<any, any>((props, ref) => {
  return (
    <Form layout="vertical" ref={ref} {...props}>
      <Form.Item
        name="password"
        label="新密码"
        rules={[
          {
            required: true,
            message: '请输入密码！',
          },
          {
            pattern: passwordReg,
            message: '密码必须由大小写字母、数字、特殊字符组成,且不小于8位',
          },
        ]}
      >
        <Input.Password placeholder="请输入新密码" />
      </Form.Item>
      <Form.Item
        name="confirmPassword"
        label="确认密码"
        rules={[
          {
            required: true,
            message: '确认密码为必填项',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('您输入的两个密码不匹配!'));
            },
          }),
        ]}
      >
        <Input.Password placeholder="请输入确认密码" />
      </Form.Item>
    </Form>
  );
});

export default ChangePassword;
