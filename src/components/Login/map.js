import React from 'react';
import { Icon } from 'antd';
import { formatMessage } from 'umi/locale';
import styles from './index.less';

export default {
  UserName: {
    props: {
      size: 'large',
      id: 'userName',
      prefix: <Icon type="user" className={styles.prefixIcon} />,
      placeholder: 'admin',
    },
    rules: [
      {
        required: true,
        message: formatMessage({ id: 'validation.userName.required' }),
      },
    ],
  },
  Password: {
    props: {
      size: 'large',
      prefix: <Icon type="lock" className={styles.prefixIcon} />,
      type: 'password',
      id: 'password',
      placeholder: '888888',
    },
    rules: [
      {
        required: true,
        message: formatMessage({ id: 'validation.password.required' }),
      },
    ],
  },
  Mobile: {
    props: {
      size: 'large',
      prefix: <Icon type="mobile" className={styles.prefixIcon} />,
      placeholder: formatMessage({ id: 'form.phone-number.placeholder' }),
    },
    rules: [
      {
        required: true,
        message: formatMessage({ id: 'validation.phone-number.required' }),
      },
      {
        pattern: /^1\d{10}$/,
        message: formatMessage({ id: 'validation.phone-number.wrong-format' }),
      },
    ],
  },
  Captcha: {
    props: {
      size: 'large',
      prefix: <Icon type="mail" className={styles.prefixIcon} />,
      placeholder: formatMessage({ id: 'form.verification-code.placeholder' }),
    },
    rules: [
      {
        required: true,
        message: formatMessage({ id: 'validation.verification-code.required' }),
      },
    ],
  },
};
