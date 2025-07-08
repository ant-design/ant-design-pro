import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token }) => {
  return {
    avatarList: {
      display: 'inline-block',
      ul: { display: 'inline-block', marginLeft: '8px', fontSize: '0' },
    },
    avatarItem: {
      display: 'inline-block',
      width: token.controlHeight,
      height: token.controlHeight,
      marginLeft: '-8px',
      fontSize: token.fontSize,
      '.ant-avatar': { border: `1px solid ${token.colorBorder}` },
    },
    avatarItemLarge: {
      width: token.controlHeightLG,
      height: token.controlHeightLG,
    },
    avatarItemSmall: {
      width: token.controlHeightSM,
      height: token.controlHeightSM,
    },
    avatarItemMini: {
      width: '20px',
      height: '20px',
      '.ant-avatar': {
        width: '20px',
        height: '20px',
        lineHeight: '20px',
        '.ant-avatar-string': {
          fontSize: '12px',
          lineHeight: '18px',
        },
      },
    },
  };
});

export default useStyles;
