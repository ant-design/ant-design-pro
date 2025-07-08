import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token }) => {
  return {
    avatarHolder: {
      marginBottom: '24px',
      textAlign: 'center',
      '& > img': { width: '104px', height: '104px', marginBottom: '20px' },
    },
    name: {
      marginBottom: '4px',
      color: token.colorTextHeading,
      fontWeight: '500',
      fontSize: '20px',
      lineHeight: '28px',
    },
    detail: {
      p: {
        position: 'relative',
        marginBottom: '8px',
        paddingLeft: '26px',
        '&:last-child': {
          marginBottom: '0',
        },
      },
      i: {
        position: 'absolute',
        top: '4px',
        left: '0',
        width: '14px',
        height: '14px',
      },
    },
    tagsTitle: {
      marginBottom: '12px',
      color: token.colorTextHeading,
      fontWeight: '500',
    },
    teamTitle: {
      marginBottom: '12px',
      color: token.colorTextHeading,
      fontWeight: '500',
    },
    tags: {
      '.ant-tag': { marginBottom: '8px' },
    },
    team: {
      '.ant-avatar': { marginRight: '12px' },
      a: {
        display: 'block',
        marginBottom: '24px',
        overflow: 'hidden',
        color: token.colorText,
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        wordBreak: 'break-all',
        transition: 'color 0.3s',
        '&:hover': {
          color: token.colorPrimary,
        },
      },
    },
    tabsCard: {
      '.ant-card-head': { padding: '0 16px' },
    },
  };
});

export default useStyles;
