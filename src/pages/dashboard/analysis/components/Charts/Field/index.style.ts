import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token }) => {
  return {
    field: {
      margin: '0',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      'label,  .number': { fontSize: token.fontSizeBase, lineHeight: '22px' },
      number: { marginLeft: '8px', color: token.headingColor },
    },
  };
});

export default useStyles;
