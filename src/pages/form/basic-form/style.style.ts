import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token }) => {
  return {
    optional: {
      color: token.textColorSecondary,
      fontStyle: 'normal',
    },
  };
});

export default useStyles;
