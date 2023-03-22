import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token }) => {
  return {
    avatarList: {
      display: 'inline-block',
      ul: { display: 'inline-block', marginLeft: '8px', fontSize: '0' },
    },
    avatarItem: {
      display: 'inline-block',
      width: token.avatarSizeBase,
      height: token.avatarSizeBase,
      marginLeft: '-8px',
      fontSize: token.fontSizeBase,
      ':global': {
        'ant-avatar': {
          border: '1px solid @border-color-base',
        },
      },
    },
    avatarItemLarge: {
      width: token.avatarSizeLg,
      height: token.avatarSizeLg,
    },
    avatarItemSmall: {
      width: token.avatarSizeSm,
      height: token.avatarSizeSm,
    },
    avatarItemMini: {
      width: '20px',
      height: '20px',
      ':global': {
        'ant-avatar': {
          width: '20px',
          height: '20px',
          lineHeight: '20px',
          'ant-avatar-string': { fontSize: '12px', lineHeight: '18px' },
        },
      },
    },
  };
});

export default useStyles;
