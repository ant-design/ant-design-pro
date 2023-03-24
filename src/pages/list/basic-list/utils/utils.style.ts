import { createStyles } from 'antd-style';

const useStyles = createStyles(() => {
  return {
    'clearfix()': {
      zoom: '1',
      '&::before, &::after': { display: 'table', content: "' '" },
      '&::after': { clear: 'both', height: '0', fontSize: '0', visibility: 'hidden' },
    },
  };
});
export default useStyles;
