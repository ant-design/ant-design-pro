import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token }) => {
  return {
    main: {
      width: '368px',
      margin: '0 auto',
      h3: { marginBottom: '20px', fontSize: '16px' },
      password: {
        marginBottom: '24px',
        ':global': {
          'ant-form-item-explain': { display: 'none' },
        },
      },
      getCaptcha: { display: 'block', width: '100%' },
      submit: { width: '50%' },
      login: { float: 'right', lineHeight: token.btnHeightLg },
    },
    'success,.warning,.error': {
      transition: 'color 0.3s',
    },
    success: {
      color: token.successColor,
    },
    warning: {
      color: token.warningColor,
    },
    error: {
      color: token.errorColor,
    },
    'progress-pass > .progress': {
      ':global': {
        'ant-progress-bg': {
          backgroundColor: token.warningColor,
        },
      },
    },
  };
});

export default useStyles;
