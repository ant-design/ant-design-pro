import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token }) => {
  return {
    card: {
      marginBottom: '24px',
      '.ant-legacy-form-item .ant-legacy-form-item-control-wrapper': {
        width: '100%',
      },
    },
    errorIcon: {
      marginRight: '12px',
      color: token.colorError,
      cursor: 'pointer',
      'span.anticon': { marginRight: '4px' },
      float: 'left',
      marginTop: '4px',
      paddingBottom: '22px',
    },
    errorPopover: {
      '.ant-popover-inner-content': {
        minWidth: '256px',
        maxHeight: '290px',
        padding: '0',
        overflow: 'auto',
      },
    },
    errorListItem: {
      padding: '8px 16px',
      listStyle: 'none',
      borderBottom: `1px solid ${token.colorSplit}`,
      cursor: 'pointer',
      transition: 'all 0.3s',
      '&:hover': { background: token.colorBgTextActive },
      '&:last-child': { border: '0' },
    },
    errorField: {
      marginTop: '2px',
      color: token.colorTextSecondary,
      fontSize: '12px',
    },
    editable: {
      td: { paddingTop: '13px', paddingBottom: '12.5px' },
    },
  };
});

export default useStyles;
