import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token }) => {
  return {
    trendItem: {
      display: 'inline-block',
      fontSize: token.fontSize,
      lineHeight: '22px',
    },
    up: {
      color: token['red-6'],
    },
    down: {
      top: '-1px',
      color: token['green-6'],
    },
    trendItemGrey: {
      up: {
        color: token.colorText,
      },
      down: {
        color: token.colorText,
      },
    },
    reverseColor: {
      up: { color: token['green-6'] },
      down: { color: token['red-6'] },
    },
  };
});

export default useStyles;
