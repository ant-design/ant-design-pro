import { createStyles } from 'antd-style';

const useStyles = createStyles(() => {
  return {
    registerResult: {
      width: '800px',
      minHeight: '400px',
      margin: 'auto',
      padding: '80px',
      background: 'none',
    },
    anticon: {
      fontSize: '64px',
    },
    title: {
      marginTop: '32px',
      fontSize: '20px',
      lineHeight: '28px',
    },
    actions: {
      marginTop: '40px',
      'a + a': { marginLeft: '8px' },
    },
  };
});
export default useStyles;
