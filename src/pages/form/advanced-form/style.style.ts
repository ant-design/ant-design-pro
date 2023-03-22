import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token }) => {
  return {
    card: {
      marginBottom: '24px',
      ':global': {
        'ant-legacy-form-item .ant-legacy-form-item-control-wrapper': {
          width: '100%',
        },
      },
    },
    errorIcon: {
      marginRight: '24px',
      color: token.errorColor,
      cursor: 'pointer',
      spananticon: { marginRight: '4px' },
    },
    errorPopover: {
      ':global': {
        'ant-popover-inner-content': {
          minWidth: '256px',
          maxHeight: '290px',
          padding: '0',
          overflow: 'auto',
        },
      },
    },
    errorListItem: {
      padding: '8px 16px',
      listStyle: 'none',
      borderBottom: '1px solid @border-color-split',
      cursor: 'pointer',
      transition: 'all 0.3s',
      '&:hover': { background: token.itemActiveBg },
      '&:last-child': { border: '0' },
      errorIcon: {
        float: 'left',
        marginTop: '4px',
        marginRight: '12px',
        paddingBottom: '22px',
        color: token.errorColor,
      },
      errorField: {
        marginTop: '2px',
        color: token.textColorSecondary,
        fontSize: '12px',
      },
    },
    editable: {
      td: { paddingTop: '13px', paddingBottom: '12.5px' },
    },
  };
});

export default useStyles;
