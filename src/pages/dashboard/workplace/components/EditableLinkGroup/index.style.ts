import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token }) => {
  return {
    linkGroup: {
      padding: '20px 0 8px 24px',
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
