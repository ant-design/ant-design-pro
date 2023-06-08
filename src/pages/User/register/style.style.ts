import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token }) => {
  return {
    main: {
      width: '368px',
      margin: '0 auto',
      h3: { marginBottom: '20px', fontSize: '16px' },
    },
    password: {
      marginBottom: '24px',
      '.ant-form-item-explain': { display: 'none' },
    },
    getCaptcha: {
      display: 'block',
      width: '100%',
    },
    submit: {
      width: '50%',
    },
    login: {
      float: 'right',
      lineHeight: token.controlHeight,
    },
    success: {
      transition: 'color 0.3s',
      color: token.colorSuccess,
    },
    warning: {
      transition: 'color 0.3s',
      color: token.colorWarning,
    },
    error: {
      transition: 'color 0.3s',
      color: token.colorError,
    },
    'progress-pass > .progress': {
      '.ant-progress-bg': { backgroundColor: token.colorWarning },
    },
  };
});

export default useStyles;
