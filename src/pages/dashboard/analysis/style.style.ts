import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token }) => {
  return {
    iconGroup: {
      spananticon: {
        marginLeft: '16px',
        color: token.textColorSecondary,
        cursor: 'pointer',
        transition: 'color 0.32s',
        '&:hover': {
          color: token.textColor,
        },
      },
    },
    rankingList: {
      margin: '25px 0 0',
      padding: '0',
      listStyle: 'none',
      li: {
        display: 'flex',
        alignItems: 'center',
        marginTop: '16px',
        zoom: '1',
        '&::before,    &::after': {
          display: 'table',
          content: "' '",
        },
        '&::after': {
          clear: 'both',
          height: '0',
          fontSize: '0',
          visibility: 'hidden',
        },
        span: {
          color: token.textColor,
          fontSize: '14px',
          lineHeight: '22px',
        },
        rankingItemNumber: {
          display: 'inline-block',
          width: '20px',
          height: '20px',
          marginTop: '1.5px',
          marginRight: '16px',
          fontWeight: '600',
          fontSize: '12px',
          lineHeight: '20px',
          textAlign: 'center',
          backgroundColor: token.tagDefaultBg,
          borderRadius: '20px',
          '&active': { color: '#fff', backgroundColor: '#314659' },
        },
        rankingItemTitle: {
          flex: '1',
          marginRight: '8px',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
        },
      },
    },
    salesExtra: {
      display: 'inline-block',
      marginRight: '24px',
      a: {
        marginLeft: '24px',
        color: token.textColor,
        '&:hover': {
          color: token.colorPrimary,
        },
        '&currentDate': {
          color: token.colorPrimary,
        },
      },
    },
    salesCard: {
      salesBar: { padding: '0 0 32px 32px' },
      salesRank: { padding: '0 32px 32px 72px' },
      ':global': {
        'ant-tabs-bar,    .ant-tabs-nav-wrap': {
          paddingLeft: '16px',
          'ant-tabs-nav .ant-tabs-tab': {
            paddingTop: '16px',
            paddingBottom: '14px',
            lineHeight: '24px',
          },
        },
        'ant-tabs-extra-content': {
          paddingRight: '24px',
          lineHeight: '55px',
        },
        'ant-card-head': {
          position: 'relative',
        },
        'ant-card-head-title': {
          alignItems: 'normal',
        },
      },
    },
    salesCardExtra: {
      height: 'inherit',
    },
    salesTypeRadio: {
      position: 'absolute',
      right: '54px',
      bottom: '12px',
    },
    offlineCard: {
      ':global': {
        'ant-tabs-ink-bar': {
          bottom: 'auto',
        },
        'ant-tabs-bar': {
          borderBottom: 'none',
        },
        'ant-tabs-nav-container-scrolling': {
          paddingRight: '40px',
          paddingLeft: '40px',
        },
        'ant-tabs-tab-prev-icon::before': {
          position: 'relative',
          left: '6px',
        },
        'ant-tabs-tab-next-icon::before': {
          position: 'relative',
          right: '6px',
        },
        'ant-tabs-tab-active h4': {
          color: token.colorPrimary,
        },
      },
    },
    trendText: {
      marginLeft: '8px',
      color: token.headingColor,
    },
    [`@mediascreen and (max-width: token.screen-lg)`]: {
      salesExtra: { display: 'none' },
      rankingList: {
        li: {
          'span:first-child': { marginRight: '8px' },
        },
      },
    },
    [`@mediascreen and (max-width: token.screen-md)`]: {
      rankingTitle: { marginTop: '16px' },
      'salesCard .salesBar': { padding: '16px' },
    },
    [`@mediascreen and (max-width: token.screen-sm)`]: {
      salesExtraWrap: { display: 'none' },
      salesCard: {
        ':global': {
          'ant-tabs-content': { paddingTop: '30px' },
        },
      },
    },
  };
});

export default useStyles;
