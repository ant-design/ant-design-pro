import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token }) => {
  return {
    main: {
      ':global': {
        'ant-descriptions-row > td': {
          paddingBottom: '8px',
        },
        'ant-page-header-heading-extra': {
          flexDirection: 'column',
        },
      },
    },
    headerList: {
      marginBottom: '4px',
      ':global': {
        'ant-descriptions-row > td': {
          paddingBottom: '8px',
        },
      },
      stepDescription: {
        position: 'relative',
        left: '38px',
        paddingTop: '8px',
        fontSize: '14px',
        textAlign: 'left',
        '> div': {
          marginTop: '8px',
          marginBottom: '4px',
        },
      },
    },
    pageHeader: {
      ':global': {
        'ant-page-header-heading-extra > * + *': {
          marginLeft: '8px',
        },
      },
      moreInfo: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '200px',
      },
    },
    [`@mediascreen and (max-width: token.screen-sm)`]: {
      stepDescription: { left: '8px' },
      pageHeader: {
        ':global': {
          'ant-pro-page-header-wrap-row': { flexDirection: 'column' },
        },
      },
    },
  };
});

export default useStyles;
