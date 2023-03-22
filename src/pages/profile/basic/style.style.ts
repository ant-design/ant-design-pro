import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token }) => {
  return {
    title: {
      marginBottom: '16px',
      color: token.headingColor,
      fontWeight: '500',
      fontSize: '16px',
    },
  };
});

export default useStyles;
