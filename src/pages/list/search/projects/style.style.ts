import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token }) => {
  return {
    card: {
      '.ant-card-meta-title': {
        marginBottom: '4px',
        '& > a': {
          display: 'inline-block',
          maxWidth: '100%',
          color: token.colorTextHeading,
        },
      },
      '.ant-card-meta-description': {
        height: '44px',
        overflow: 'hidden',
        lineHeight: '22px',
      },
      '&:hover': {
        '.ant-card-meta-title > a': {
          color: token.colorPrimary,
        },
      },
    },
    cardItemContent: {
      display: 'flex',
      height: '20px',
      marginTop: '16px',
      marginBottom: '-4px',
      lineHeight: '20px',
      '& > span': {
        flex: '1',
        color: token.colorTextSecondary,
        fontSize: '12px',
      },
    },
    avatarList: {
      flex: '0 1 auto',
    },
    cardList: {
      marginTop: '24px',
    },
    coverCardList: {
      '.ant-list .ant-list-item-content-single': { maxWidth: '100%' },
    },
  };
});

export default useStyles;
