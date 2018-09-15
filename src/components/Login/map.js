import React from 'react';
import { formatMessage } from 'umi/locale';
import { Icon } from 'antd';
import styles from './index.less';

export default {
  UserName: {
    props: {
      size: 'large',
      prefix: <Icon type="user" className={styles.prefixIcon} />,
    },
    rules: [
      {
        required: true,
        message: formatMessage(
          { id: 'login.username.required.message', defaultMessage: 'Please enter username!' },
          {}
        ),
      },
    ],
  },
  Password: {
    props: {
      size: 'large',
      prefix: <Icon type="lock" className={styles.prefixIcon} />,
      type: 'password',
      placeholder: '888888',
    },
    rules: [
      {
        required: true,
        message: formatMessage(
          { id: 'login.password.required.message', defaultMessage: 'Please enter password!' },
          {}
        ),
      },
    ],
  },
  Mobile: {
    props: {
      size: 'large',
      prefix: <Icon type="mobile" className={styles.prefixIcon} />,
      placeholder: 'mobile number',
    },
    rules: [
      {
        required: true,
        message: formatMessage(
          { id: 'login.mobile.required.message', defaultMessage: 'Please enter mobile number!' },
          {}
        ),
      },
      {
        pattern: /^1\d{10}$/,
        message: formatMessage(
          { id: 'login.mobile.format.message', defaultMessage: 'Wrong mobile number format!' },
          {}
        ),
      },
    ],
  },
  Captcha: {
    props: {
      size: 'large',
      prefix: <Icon type="mail" className={styles.prefixIcon} />,
      placeholder: 'captcha',
    },
    rules: [
      {
        required: true,
        message: formatMessage(
          { id: 'login.captcha.required.message', defaultMessage: 'Please enter Captcha!' },
          {}
        ),
      },
    ],
  },
};
