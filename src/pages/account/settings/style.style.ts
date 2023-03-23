import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token }) => {
  return {
    main: {
      [`@media screen and (max-width: ${token.screenMD}px)`]: {
        flexDirection: 'column',
      },
    },
    leftMenu: {
      [`@media screen and (max-width: ${token.screenMD}px)`]: {
        width: '100%',
        border: 'none',
      },
    },
    '.ant-menu-inline': {
      border: 'none',
    },
    '.ant-menu-horizontal': {
      fontWeight: 'bold',
    },
    right: {
      [`@media screen and (max-width: ${token.screenMD}px)`]: {
        padding: '40px',
      },
    },
    title: {
      marginBottom: '12px',
      color: token.colorTextHeading,
      fontWeight: '500',
      fontSize: '20px',
      lineHeight: '28px',
    },
    '.ant-list-split .ant-list-item:last-child': {
      borderBottom: '1px solid @border-color-split',
    },
    '.ant-list-item': {
      paddingTop: '14px',
      paddingBottom: '14px',
    },
    '.ant-list-item-meta': {},
    '// 账号绑定图标 .taobao': {
      display: 'block',
      color: '#ff4000',
      fontSize: '48px',
      lineHeight: '48px',
      borderRadius: token.borderRadius,
    },
    dingding: {
      margin: '2px',
      padding: '6px',
      color: '#fff',
      fontSize: '32px',
      lineHeight: '32px',
      backgroundColor: '#2eabff',
      borderRadius: token.borderRadius,
    },
    alipay: {
      color: '#2eabff',
      fontSize: '48px',
      lineHeight: '48px',
      borderRadius: token.borderRadius,
    },
    '// 密码强度 font.strong': {
      color: token.colorSuccess,
    },
    'font.medium': {
      color: token.colorWarning,
    },
    'font.weak': {
      color: token.colorError,
    },
  };
});

export default useStyles;
