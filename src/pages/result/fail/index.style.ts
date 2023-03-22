import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token }) => {
  return {
    error_icon: {
      color: token.highlightColor,
    },
    title: {
      marginBottom: '16px',
      color: token.headingColor,
      fontWeight: '500',
      fontSize: '16px',
    },
  };
});

export default useStyles;
