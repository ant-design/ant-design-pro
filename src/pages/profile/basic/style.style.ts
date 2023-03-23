import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token }) => {
  return {
    title: {
      marginBottom: '16px',
      color: token.colorTextHeading,
      fontWeight: '500',
      fontSize: '16px',
    },
  };
});

export default useStyles;
