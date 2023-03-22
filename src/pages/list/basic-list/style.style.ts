import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token }) => {
  return {
    standardList: {
      ':global': {
        'ant-card-head': {
          borderBottom: 'none',
        },
        'ant-card-head-title': {
          padding: '24px 0',
          lineHeight: '32px',
        },
        'ant-card-extra': {
          padding: '24px 0',
        },
        'ant-list-pagination': {
          marginTop: '24px',
          textAlign: 'right',
        },
        'ant-avatar-lg': {
          width: '48px',
          height: '48px',
          lineHeight: '48px',
        },
      },
      headerInfo: {
        position: 'relative',
        textAlign: 'center',
        '& > span': {
          display: 'inline-block',
          marginBottom: '4px',
          color: token.textColorSecondary,
          fontSize: token.fontSizeBase,
          lineHeight: '22px',
        },
        '& > p': {
          margin: '0',
          color: token.headingColor,
          fontSize: '24px',
          lineHeight: '32px',
        },
        '& > em': {
          position: 'absolute',
          top: '0',
          right: '0',
          width: '1px',
          height: '56px',
          backgroundColor: token.borderColorSplit,
        },
      },
      listContent: {
        fontSize: '0',
        listContentItem: {
          display: 'inline-block',
          marginLeft: '40px',
          color: token.textColorSecondary,
          fontSize: token.fontSizeBase,
          verticalAlign: 'middle',
          '> span': { lineHeight: '20px' },
          '> p': { marginTop: '4px', marginBottom: '0', lineHeight: '22px' },
        },
      },
      extraContentSearch: { width: '272px', marginLeft: '16px' },
    },
    [`@mediascreen and (max-width: token.screen-xs)`]: {
      standardList: {
        ':global': {
          'ant-list-item-content': {
            display: 'block',
            flex: 'none',
            width: '100%',
          },
          'ant-list-item-action': { marginLeft: '0' },
        },
        listContent: {
          marginLeft: '0',
          '& > div': { marginLeft: '0' },
        },
        listCard: {
          ':global': {
            'ant-card-head-title': {
              overflow: 'visible',
            },
          },
        },
      },
    },
    [`@mediascreen and (max-width: token.screen-sm)`]: {
      standardList: {
        extraContentSearch: {
          width: '100%',
          marginLeft: '0',
        },
        headerInfo: {
          marginBottom: '16px',
          '& > em': { display: 'none' },
        },
      },
    },
    [`@mediascreen and (max-width: token.screen-md)`]: {
      standardList: {
        listContent: {
          '& > div': { display: 'block' },
          '& > div:last-child': { top: '0', width: '100%' },
        },
      },
      listCard: {
        ':global': {
          'ant-radio-group': { display: 'block', marginBottom: '8px' },
        },
      },
    },
    [`@mediascreen and (max-width: token.screen-lg) and (min-width: token.screen-md)`]: {
      standardList: {
        listContent: {
          '& > div': { display: 'block' },
          '& > div:last-child': { top: '0', width: '100%' },
        },
      },
    },
    [`@mediascreen and (max-width: token.screen-xl)`]: {
      standardList: {
        listContent: {
          '& > div': { marginLeft: '24px' },
          '& > div:last-child': { top: '0' },
        },
      },
    },
    '@mediascreen and (max-width: 1400px)': {
      standardList: {
        listContent: {
          textAlign: 'right',
          '& > div:last-child': { top: '0' },
        },
      },
    },
    standardListForm: {
      ':global': {
        'ant-form-item': {
          marginBottom: '12px',
          '&:last-child': { marginBottom: '32px', paddingTop: '4px' },
        },
      },
    },
    formResult: {
      width: '100%',
      "[class^='title']": { marginBottom: '8px' },
    },
  };
});

export default useStyles;
