import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token }) => {
  return {
    mapChart: {
      flex: 1,
      minHeight: 420,
      marginTop: 16,
      position: 'relative',
      img: { display: 'inline-block', maxWidth: '100%' },
      [`@media screen and (max-width: ${token.screenLG}px)`]: {
        height: 300,
      },
    },
  };
});

export default useStyles;
