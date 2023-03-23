import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token }) => {
  return {
    title: {
      position: 'relative',
      color: token.colorText,
      fontSize: '12px',
      textAlign: 'center',
    },
    'head-title': {
      marginBottom: '20px',
      color: token.colorTextHeading,
      fontWeight: '500px',
      fontSize: '16px',
    },
  };
});

export default useStyles;
