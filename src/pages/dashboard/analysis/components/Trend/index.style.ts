import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token }) => {
  return {
    trendItem: {
      display: 'inline-block',
      fontSize: token.fontSize,
      lineHeight: '22px',
    },
    up: {
      color: token.red6,
    },
    down: {
      top: '-1px',
      color: token.green6,
    },
    span: {
      fontSize: '12px',
      transform: 'scale(0.83)',
    },
    'trendItemGrey .up, trendItemGrey .down': {
      color: token.colorText,
    },
    'reverseColor .up': {
      color: token.green6,
    },
    'reverseColor .down': {
      color: token.red6,
    },
  };
});

export default useStyles;
