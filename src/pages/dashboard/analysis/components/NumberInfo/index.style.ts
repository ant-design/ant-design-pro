import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token }) => {
  return {
    numberInfo: {
      suffix: {
        marginLeft: '4px',
        color: token.textColor,
        fontSize: '16px',
        fontStyle: 'normal',
      },
      numberInfoTitle: {
        marginBottom: '16px',
        color: token.textColor,
        fontSize: token.fontSizeLg,
        transition: 'all 0.3s',
      },
      numberInfoSubTitle: {
        height: '22px',
        overflow: 'hidden',
        color: token.textColorSecondary,
        fontSize: token.fontSizeBase,
        lineHeight: '22px',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        wordBreak: 'break-all',
      },
      numberInfoValue: {
        marginTop: '4px',
        overflow: 'hidden',
        fontSize: '0',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        wordBreak: 'break-all',
        '& > span': {
          display: 'inline-block',
          height: '32px',
          marginRight: '32px',
          color: token.headingColor,
          fontSize: '24px',
          lineHeight: '32px',
        },
        subTotal: {
          marginRight: '0',
          color: token.textColorSecondary,
          fontSize: token.fontSizeLg,
          verticalAlign: 'top',
          anticon: {
            marginLeft: '4px',
            fontSize: '12px',
            transform: 'scale(0.82)',
          },
          ':global': {
            'anticon-caret-up': {
              color: token.red6,
            },
            'anticon-caret-down': {
              color: token.green6,
            },
          },
        },
      },
    },
    numberInfolight: {
      numberInfoValue: {
        '& > span': {
          color: token.textColor,
        },
      },
    },
  };
});

export default useStyles;
