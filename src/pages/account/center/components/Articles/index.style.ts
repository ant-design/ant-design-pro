import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token }) => {
  return {
    articleList: {
      ':global': {
        'ant-list-item:first-child': {
          paddingTop: '0',
        },
      },
    },
    alistItemMetaTitle: {
      color: token.headingColor,
    },
  };
});

export default useStyles;
