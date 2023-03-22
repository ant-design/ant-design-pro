import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token }) => {
  return {
    cardList: {
      card: {
        ':global': {
          'ant-card-meta-title': {
            marginBottom: '12px',
            '& > a': {
              display: 'inline-block',
              maxWidth: '100%',
              color: token.headingColor,
            },
          },
          'ant-card-body:hover': {
            'ant-card-meta-title > a': {
              color: token.colorPrimary,
            },
          },
        },
      },
      item: { height: '64px' },
      ':global': {
        'ant-list .ant-list-item-content-single': {
          maxWidth: '100%',
        },
      },
    },
    extraImg: {
      width: '155px',
      marginTop: '-20px',
      textAlign: 'center',
      img: { width: '100%' },
    },
    newButton: {
      width: '100%',
      height: '201px',
      color: token.textColorSecondary,
      backgroundColor: token.componentBackground,
      borderColor: token.colorBorder,
    },
    cardAvatar: {
      width: '48px',
      height: '48px',
      borderRadius: '48px',
    },
    cardDescription: {
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      wordBreak: 'break-all',
    },
    pageHeaderContent: {
      position: 'relative',
    },
    contentLink: {
      marginTop: '16px',
      a: {
        marginRight: '32px',
        img: {
          width: '24px',
        },
      },
      img: { marginRight: '8px', verticalAlign: 'middle' },
    },
    [`@mediascreen and (max-width: token.screen-lg)`]: {
      contentLink: {
        a: {
          marginRight: '16px',
        },
      },
    },
    [`@mediascreen and (max-width: token.screen-md)`]: {
      extraImg: { display: 'none' },
    },
    [`@mediascreen and (max-width: token.screen-sm)`]: {
      pageHeaderContent: { paddingBottom: '30px' },
      contentLink: {
        position: 'absolute',
        bottom: '-4px',
        left: '0',
        width: '1000px',
        a: {
          marginRight: '16px',
        },
        img: {
          marginRight: '4px',
        },
      },
    },
  };
});

export default useStyles;
