import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token }) => {
  return {
    mapChart: {
      height: '452px',
      paddingTop: '24px',
      img: { display: 'inline-block', maxWidth: '100%', maxHeight: '437px' },
      [`@media screen and (max-width: ${token.screenLG}px)`]: {
        height: 'auto',
      },
    },
  };
});

export default useStyles;
