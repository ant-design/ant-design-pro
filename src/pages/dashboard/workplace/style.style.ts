import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token }) => {
  return {
    activitiesList: {
      padding: '0 24px 8px 24px',
    },
    username: {
      color: token.colorText,
    },
    event: {
      fontWeight: 'normal',
    },
    pageHeaderContent: {
      display: 'flex',
      [`@media screen and (max-width: ${token.screenSM}px)`]: {
        display: 'block',
      },
    },
    avatar: {
      flex: '0 1 72px',
      '& > span': {
        display: 'block',
        width: '72px',
        height: '72px',
        borderRadius: '72px',
      },
    },
    content: {
      position: 'relative',
      top: '4px',
      flex: '1 1 auto',
      marginLeft: '24px',
      color: token.colorTextSecondary,
      lineHeight: '22px',
      [`@media screen and (max-width: ${token.screenSM}px)`]: {
        marginLeft: '0',
      },
    },
    contentTitle: {
      marginBottom: '12px',
      color: token.colorTextHeading,
      fontWeight: '500',
      fontSize: '20px',
      lineHeight: '28px',
    },
    extraContent: {
      zoom: '1',
      '&::before, &::after': { display: 'table', content: "' '" },
      '&::after': {
        clear: 'both',
        height: '0',
        fontSize: '0',
        visibility: 'hidden',
      },
      float: 'right',
      whiteSpace: 'nowrap',
      [`@media screen and (max-width: ${token.screenXL}px) and (min-width: @screen-lg)`]: {
        marginLeft: '-44px',
      },
      [`@media screen and (max-width: ${token.screenLG}px)`]: {
        float: 'none',
        marginRight: '0',
      },
      [`@media screen and (max-width: ${token.screenMD}px)`]: {
        marginLeft: '-16px',
      },
    },
    statItem: {
      position: 'relative',
      display: 'inline-block',
      padding: '0 32px',
      '> p:first-child': {
        marginBottom: '4px',
        color: token.colorTextSecondary,
        fontSize: token.fontSize,
        lineHeight: '22px',
      },
      '> p': {
        margin: '0',
        color: token.colorTextHeading,
        fontSize: '30px',
        lineHeight: '38px',
        '> span': {
          color: token.colorTextSecondary,
          fontSize: '20px',
        },
      },
      '&::after': {
        position: 'absolute',
        top: '8px',
        right: '0',
        width: '1px',
        height: '40px',
        backgroundColor: token.colorSplit,
        content: "''",
      },
      '&:last-child': {
        paddingRight: '0',
        '&::after': {
          display: 'none',
        },
      },
      [`@media screen and (max-width: ${token.screenXL}px) and (min-width: @screen-lg)`]: {
        padding: '0 16px',
      },
      [`@media screen and (max-width: ${token.screenLG}px)`]: {
        padding: '0 16px',
        textAlign: 'left',
        '&::after': {
          display: 'none',
        },
      },
      [`@media screen and (max-width: ${token.screenSM}px)`]: { float: 'none' },
    },
    members: {
      a: {
        display: 'block',
        height: '24px',
        margin: '12px 0',
        color: token.colorText,
        transition: 'all 0.3s',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        wordBreak: 'break-all',
        '&:hover': {
          color: token.colorPrimary,
        },
      },
      [`@media screen and (max-width: ${token.screenXL}px) and (min-width: @screen-lg)`]: {
        marginBottom: '0',
      },
      [`@media screen and (max-width: ${token.screenLG}px)`]: {
        marginBottom: '0',
      },
    },
    member: {
      marginLeft: '12px',
      fontSize: token.fontSize,
      lineHeight: '24px',
      verticalAlign: 'top',
    },
    projectList: {
      '.ant-card-meta-description': {
        height: '44px',
        overflow: 'hidden',
        color: token.colorTextSecondary,
        lineHeight: '22px',
      },
    },
    cardTitle: {
      fontSize: '0',
      a: {
        display: 'inline-block',
        height: '24px',
        marginLeft: '12px',
        color: token.colorTextHeading,
        fontSize: token.fontSize,
        lineHeight: '24px',
        verticalAlign: 'top',
        '&:hover': {
          color: token.colorPrimary,
        },
      },
    },
    projectGrid: {
      width: '33.33%',
      [`@media screen and (max-width: ${token.screenMD}px)`]: { width: '50%' },
      [`@media screen and (max-width: ${token.screenXS}px)`]: { width: '100%' },
    },
    projectItemContent: {
      display: 'flex',
      height: '20px',
      marginTop: '8px',
      overflow: 'hidden',
      fontSize: '12px',
      lineHeight: '20px',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      wordBreak: 'break-all',
      a: {
        display: 'inline-block',
        flex: '1 1 0',
        color: token.colorTextSecondary,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        wordBreak: 'break-all',
        '&:hover': {
          color: token.colorPrimary,
        },
      },
    },
    datetime: {
      flex: '0 0 auto',
      float: 'right',
      color: token.colorTextDisabled,
    },
    activeCard: {
      [`@media screen and (max-width: ${token.screenXL}px) and (min-width: @screen-lg)`]: {
        marginBottom: '24px',
      },
      [`@media screen and (max-width: ${token.screenLG}px)`]: {
        marginBottom: '24px',
      },
    },
  };
});

export default useStyles;
