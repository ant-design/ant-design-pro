import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token }) => {
  return {
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      ':global': {
        'command .anticon': {
          display: 'inline-block',
          width: '27px',
          height: '27px',
          margin: '0 6px',
          paddingTop: '6px',
          textAlign: 'center',
          cursor: 'pointer',
          '&:hover': { border: '1px solid @item-active-bg' },
        },
        'disable .anticon': {
          color: token.textColorSecondary,
          cursor: 'auto',
          '&:hover': { border: '1px solid @border-color-base' },
        },
      },
    },
    tooltip: {
      ':global': {
        'ant-tooltip-inner': {
          fontSize: '12px',
          borderRadius: '0',
        },
      },
    },
  };
});

export default useStyles;
