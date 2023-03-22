import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token }) => {
  return {
    contextMenu: {
      display: 'none',
      overflow: 'hidden',
      background: token.componentBackground,
      borderRadius: '4px',
      boxShadow: token.boxShadowBase,
      item: {
        display: 'flex',
        alignItems: 'center',
        padding: '5px 12px',
        cursor: 'pointer',
        transition: 'all 0.3s',
        userSelect: 'none',
        '&:hover': {
          background: token.selectItemSelectedBg,
        },
        anticon: {
          marginRight: '8px',
        },
      },
      ':global': {
        disable: {
          ':local': {
            item: {
              color: token.disabledColor,
              cursor: 'auto',
              '&:hover': { background: token.itemHoverBg },
            },
          },
        },
      },
    },
  };
});

export default useStyles;
