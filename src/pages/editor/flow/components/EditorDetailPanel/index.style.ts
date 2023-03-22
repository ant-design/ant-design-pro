import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token }) => {
  return {
    detailPanel: {
      flex: '1',
      backgroundColor: token.componentBackground,
    },
  };
});

export default useStyles;
