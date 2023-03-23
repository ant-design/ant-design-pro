import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token }) => {
  return {
    'a.listItemMetaTitle': {
      color: token.colorTextHeading,
    },
    listItemExtra: {
      [`@media screen and (max-width: ${token.screenLG}px)`]: {
        width: '0',
        height: '1px',
      },
    },
    selfTrigger: {
      [`@media screen and (max-width: ${token.screenMD}px)`]: {
        display: 'block',
        marginLeft: '0',
      },
    },
  };
});

export default useStyles;
