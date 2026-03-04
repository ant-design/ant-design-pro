import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token }) => {
  return {
    linkGroup: {
      fontSize: '0',
      '& > a': {
        display: 'inline-block',
        width: '25%',
        marginBottom: '13px',
        color: token.colorText,
        fontSize: token.fontSize,
        '&:hover': {
          color: token.colorPrimary,
        },
      },
    },
  };
});

export default useStyles;
