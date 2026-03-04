import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token }) => {
  return {
    optional: {
      color: token.colorTextSecondary,
      fontStyle: 'normal',
    },
  };
});

export default useStyles;
