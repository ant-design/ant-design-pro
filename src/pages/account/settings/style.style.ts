import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token }) => {
  return {
    main: {
      display: 'flex',
      width: '100%',
      height: '100%',
      paddingTop: '16px',
      paddingBottom: '16px',
      backgroundColor: token.menuBg,
      leftMenu: {
        width: '224px',
        borderRight: `${token.borderWidthBase} ${token.borderStyleBase} ${token.borderColorSplit}`,
        ':global': {
          'ant-menu-inline': { border: 'none' },
          '.ant-menu-horizontal': { fontWeight: 'bold' },
        },
      },
      right: {
        flex: '1',
        padding: '8px 40px',
        title: {
          marginBottom: '12px',
          color: token.headingColor,
          fontWeight: '500',
          fontSize: '20px',
          lineHeight: '28px',
        },
      },
      ':global': {
        'ant-list-split .ant-list-item:last-child': {
          borderBottom: '1px solid @border-color-split',
        },
        'ant-list-item': {
          paddingTop: '14px',
          paddingBottom: '14px',
        },
      },
    },
    ':global': {
      'ant-list-item-meta': {
        '// 账号绑定图标    taobao': {
          display: 'block',
          color: '#ff4000',
          fontSize: '48px',
          lineHeight: '48px',
          borderRadius: token.borderRadiusBase,
        },
        dingding: {
          margin: '2px',
          padding: '6px',
          color: '#fff',
          fontSize: '32px',
          lineHeight: '32px',
          backgroundColor: '#2eabff',
          borderRadius: token.borderRadiusBase,
        },
        alipay: {
          color: '#2eabff',
          fontSize: '48px',
          lineHeight: '48px',
          borderRadius: token.borderRadiusBase,
        },
      },
      '// 密码强度  fontstrong': { color: token.successColor },
      fontmedium: { color: token.warningColor },
      fontweak: { color: token.errorColor },
    },
    [`@mediascreen and (max-width: token.screen-md)`]: {
      main: {
        flexDirection: 'column',
        leftMenu: {
          width: '100%',
          border: 'none',
        },
        right: {
          padding: '40px',
        },
      },
    },
  };
});

export default useStyles;
