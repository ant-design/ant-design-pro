import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token }) => {
  return {
    alistItemMetaTitle: {
      color: token.headingColor,
    },
    listItemExtra: {
      width: '272px',
      height: '1px',
    },
    selfTrigger: {
      marginLeft: '12px',
    },
    [`@mediascreen and (max-width: token.screen-xs)`]: {
      selfTrigger: { display: 'block', marginLeft: '0' },
    },
    [`@mediascreen and (max-width: token.screen-md)`]: {
      selfTrigger: { display: 'block', marginLeft: '0' },
    },
    [`@mediascreen and (max-width: token.screen-lg)`]: {
      listItemExtra: { width: '0', height: '1px' },
    },
  };
});

export default useStyles;
