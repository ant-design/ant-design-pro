import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token }) => {
  return {
    baseView: {
      display: 'flex',
      paddingTop: '12px',
      '.ant-legacy-form-item .ant-legacy-form-item-control-wrapper': {
        width: '100%',
      },
      [`@media screen and (max-width: ${token.screenXL}px)`]: {
        flexDirection: 'column-reverse',
      },
    },
    left: {
      minWidth: '224px',
      maxWidth: '448px',
    },
    right: {
      flex: '1',
      paddingLeft: '104px',
      [`@media screen and (max-width: ${token.screenXL}px)`]: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: '448px',
        padding: '20px',
      },
    },
    avatar_title: {
      height: '22px',
      marginBottom: '8px',
      color: token.colorTextHeading,
      fontSize: token.fontSize,
      lineHeight: '22px',
      [`@media screen and (max-width: ${token.screenXL}px)`]: {
        display: 'none',
      },
    },
    avatar: {
      width: '144px',
      height: '144px',
      marginBottom: '12px',
      overflow: 'hidden',
      img: { width: '100%' },
    },
    button_view: {
      width: '144px',
      textAlign: 'center',
    },
    area_code: {
      width: '72px',
    },
    phone_number: {
      width: '214px',
    },
  };
});

export default useStyles;
