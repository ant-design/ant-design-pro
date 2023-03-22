import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token }) => {
  return {
    listContent: {
      description: { maxWidth: '720px', lineHeight: '22px' },
      extra: {
        marginTop: '16px',
        color: token.textColorSecondary,
        lineHeight: '22px',
        '& > em': {
          marginLeft: '16px',
          color: token.disabledColor,
          fontStyle: 'normal',
        },
      },
    },
    [`@mediascreen and (max-width: token.screen-xs)`]: {
      listContent: {
        extra: {
          '& > em': { display: 'block', marginTop: '8px', marginLeft: '0' },
        },
      },
    },
  };
});

export default useStyles;
