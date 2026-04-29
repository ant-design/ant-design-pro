import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token }) => {
  return {
    tagSelect: {
      position: 'relative',
      maxHeight: '32px',
      marginLeft: '-8px',
      overflow: 'hidden',
      lineHeight: '32px',
      transition: 'all 0.3s',
      userSelect: 'none',
      '.ant-tag': {
        marginRight: '24px',
        padding: '0 8px',
        fontSize: token.fontSize,
      },
    },
    trigger: {
      position: 'absolute',
      top: '0',
      right: '0',
      'span.anticon': { fontSize: '12px' },
    },
    expanded: {
      maxHeight: '200px',
      transition: 'all 0.3s',
    },
    hasExpandTag: {
      paddingRight: '50px',
    },
  };
});

export default useStyles;
